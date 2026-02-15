import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { arrayMove } from '@dnd-kit/sortable';
import { saveFormToDB, loadFormFromDB } from '../indexdb/db';

const INITIAL_STATE = {
  id: uuidv4(),
  // tSitle: 'dynamic Form',
  pages: [{ id: uuidv4(), title: 'Page 1', elements: [] }]
};

export const useDynamicForm = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [activePageId, setActivePageId] = useState(INITIAL_STATE.pages[0].id);
  const [loading, setLoading] = useState(true);

  // Load from DB
  useEffect(() => {
    loadFormFromDB().then(saved => {
      if (saved) {
        setForm(saved);
        setActivePageId(saved.pages[0]?.id || null);
      }
      setLoading(false);
    });
  }, []);

  // Sync to DB
  useEffect(() => {
    if (!loading) saveFormToDB(form);
  }, [form, loading]);

  const addPage = () => {
    const newPage = { id: uuidv4(), title: `Page ${form.pages.length + 1}`, elements: [] };
    setForm(prev => ({ ...prev, pages: [...prev.pages, newPage] }));
    setActivePageId(newPage.id);
  };

  const updatePage = (id, updates) => {
    setForm(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const deletePage = (id) => {
    setForm(prev => ({
      ...prev,
      pages: prev.pages.filter(p => p.id !== id)
    }));
  };

  const addElement = (pageId, type, parentId = null) => {
    const newElement = {
      id: uuidv4(),
      type,
      title: type === 'section' ? 'New section' : '',
      elementType: type === 'question' ? 'text' : null,
      options: type === 'question' ? [{ id: uuidv4(), label: 'Option 1' }] : undefined,
      elements: type === 'section' ? [] : undefined,
      collapsed: type === 'section' ? false : undefined,
      placeholder: type === 'question' ? 'Enter question text...' : undefined,
    };

    setForm(prev => {
      const newPages = prev.pages.map(page => {
        if (page.id !== pageId) return page;

        if (!parentId) {
          return { ...page, elements: [...page.elements, newElement] };
        }

        const updateNested = (elements) => elements.map(el => {
          if (el.id === parentId && el.type === 'section') {
            return { ...el, elements: [...el.elements, newElement] };
          }
          if (el.elements) return { ...el, elements: updateNested(el.elements) };
          return el;
        });

        return { ...page, elements: updateNested(page.elements) };
      });
      return { ...prev, pages: newPages };
    });
    return newElement;
  };

  const updateElement = (id, updates) => {
    setForm(prev => {
      const updateRef = (elements) => elements.map(el => {
        if (el.id === id) return { ...el, ...updates };
        if (el.elements) return { ...el, elements: updateRef(el.elements) };
        return el;
      });

      return {
        ...prev,
        pages: prev.pages.map(p => ({ ...p, elements: updateRef(p.elements) }))
      };
    });
  };

  const deleteElement = (id) => {
    setForm(prev => {
      const removeRef = (elements) => elements
        .filter(el => el.id !== id)
        .map(el => (el.elements ? { ...el, elements: removeRef(el.elements) } : el));

      return {
        ...prev,
        pages: prev.pages.map(p => ({ ...p, elements: removeRef(p.elements) }))
      };
    });
  };
  

  const moveElement = (activeId, overId) => {
    setForm(prev => {
      const newPages = JSON.parse(JSON.stringify(prev.pages));
      let container = null;

      const findContainer = (elements) => {
        if (elements.some(el => el.id === activeId) && elements.some(el => el.id === overId)) {
          container = elements;
          return;
        }
        elements.forEach(el => el.elements && findContainer(el.elements));
      };

      newPages.forEach(page => {
        findContainer(page.elements);
      });

      if (!container) return prev;

      const oldIdx = container.findIndex(el => el.id === activeId);
      const newIdx = container.findIndex(el => el.id === overId);
      
      const moved = arrayMove(container, oldIdx, newIdx);
      container.splice(0, container.length, ...moved);

      return { ...prev, pages: newPages };
    });
  };

  return {
    form, loading, activePageId, setActivePageId,
    addPage, updatePage, deletePage, addElement,
    updateElement, deleteElement, moveElement, setForm
  };
};
