import React, { useState } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,

} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useForm } from '../../context/formcontext';
import SortableElement from './SortableElement';
import PageHeader from './pageHeader';

const DynamicForm = () => {
  const { form, loading, setForm, addElement, addPage, moveElement } = useForm();
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (loading) return <div className="loading-state">Loading...</div>;

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active && over && active.id !== over.id) {
      setForm(prev => {
        return prev;
      });
      moveElement(active.id, over.id);
    }
  };

  const findElementRecursive = (pages, id) => {
      for (const page of pages) {
          if (page.id === id) return page; 
          const search = (elements) => {
              for (const el of elements) {
                  if (el.id === id) return el;
                  if (el.elements) {
                      const found = search(el.elements);
                      if (found) return found;
                  }
              }
              return null;
          }
          const found = search(page.elements);
          if (found) return found;
      }
      return null;
  };

  const activeElement = activeId ? findElementRecursive(form.pages, activeId) : null;

  return (
    <div className="form-canvas-wrapper">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {form.pages.map((page, pageIndex) => (
          <div key={page.id} className="page-container">
            <PageHeader page={page} index={pageIndex} />
            
            <div className="elements-list">
                <SortableContext
                    items={page.elements.map(el => el.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {page.elements.map((element) => (
                        <SortableElement key={element.id} element={element} pageId={page.id} />
                    ))}
                </SortableContext>
            </div>

            <div className="page-footer-actions">
                <button className="inline-add-btn" onClick={() => addElement(page.id, 'question')}>
                    <img src="/src/assets/question.png" alt="Add Question" style={{height: '16px', width: 'auto'}} />
                    <span>Question</span>
                </button>
                <button className="inline-add-btn" onClick={() => addElement(page.id, 'section')}>
<img src="/src/assets/section.png" alt="Add Section" style={{height: '16px', width: 'auto'}} />Section

                </button>
                {pageIndex === form.pages.length - 1 && (
                    <button className="inline-add-btn primary-add-img" onClick={addPage}>
                        <img src="/src/assets/add-page.png" alt="Add Page" style={{height: '16px', width: 'auto'}} />
                        <span>Add Page</span>
                    </button>
                )}
            </div>
          </div>
        ))}
        
        {form.pages.length === 0 && (
            <div className="empty-state-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', padding: '2rem' }}>
                <button className="inline-add-btn" onClick={() => {
                    // We need a way to add page then element. 
                    // For now, let's just add a page, user can then add question.
                    // Or ideally update store to handle "addPageWithElement"
                    addPage();
                }}>
                    <img src="/src/assets/question.png" alt="Add Question" style={{height: '16px', width: 'auto'}} />
                    <span>Question</span>
                </button>
                <button className="inline-add-btn" onClick={addPage}>
                    <img src="/src/assets/section.png" alt="Add Section" style={{height: '16px', width: 'auto'}} />
                    <span>Section</span>
                </button>
                <button className="inline-add-btn primary-add-img" onClick={addPage}>
                    <img src="/src/assets/add-page.png" alt="Add Page" style={{height: '16px', width: 'auto'}} />
                    <span>Add Page</span>
                </button>
            </div>
        )}

        <DragOverlay>
            {activeId && activeElement ? (
               <SortableElement element={activeElement} pageId={activeElement.pageId} overlay />
            ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DynamicForm;
