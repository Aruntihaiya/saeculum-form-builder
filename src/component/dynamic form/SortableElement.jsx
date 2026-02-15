import React, { memo } from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ChevronDown } from 'lucide-react';
import { useForm } from '../../context/FormContext';

const SortableElement = memo(({ element, pageId, parentId, overlay }) => {
  const { updateElement, deleteElement, addElement } = useForm();
  
  // Use persistent state from the element object
  const isExpanded = element.type === 'section' ? !element.collapsed : true;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: element.id, 
    disabled: !!overlay || (element.type === 'section' && isExpanded) 
  });

  const style = {
    transform: overlay ? undefined : CSS.Translate.toString(transform),
    transition,
  };

  const onUpdate = (key, val) => updateElement(element.id, { [key]: val });

  if (element.type === 'section') {
    return (
      <div ref={setNodeRef} style={style} className={`element-row section-row ${isDragging ? 'is-dragging' : ''}`}>
        <div className="section-title-area">
          {!isExpanded && (
            <div className="row-handle" {...attributes} {...listeners}>
              <GripVertical size={14} />
            </div>
          )}
          <ChevronDown 
            size={14} 
            className={`section-chevron ${!isExpanded ? 'collapsed' : ''}`} 
            onClick={() => onUpdate('collapsed', !element.collapsed)}
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
          />
          <input className="row-input section-title" value={element.title} onChange={(e) => onUpdate('title', e.target.value)} />
          <button className="delete-btn" onClick={() => deleteElement(element.id)}><Trash2 size={16} /></button>
        </div>
        
        {isExpanded && (
          <>
            <div className="section-content">
              <SortableContext items={element.elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
                {element.elements.map(child => (
                  <SortableElement key={child.id} element={child} pageId={pageId} parentId={element.id} />
                ))}
              </SortableContext>
            </div>

            <div className="section-footer">
              <button className="inline-add-btn small" onClick={() => addElement(pageId, 'question', element.id)}>
                <img src="/src/assets/question.png" alt="" style={{height: 16}} />
                <span>Question</span>
              </button>
              <button className="inline-add-btn small" onClick={() => addElement(pageId, 'section', element.id)}>
                <img src="/src/assets/section.png" alt="" style={{height: 16}} />
                <span>Section</span>
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className={`element-row question-row ${isDragging ? 'is-dragging' : ''}`}>
      <div className="row-handle" {...attributes} {...listeners}><GripVertical size={14} /></div>
      
      <div className="row-content">
        <div className="row-header">
          <div className="question-input-wrapper">
            <div className="row-label">Question</div>
            <input 
              className="row-input" 
              value={element.title} 
              onChange={(e) => onUpdate('title', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addElement(pageId, 'question', parentId, element.id)}
            />
          </div>
          
          <div className="row-type">
            <div className="row-label">Types of responses</div>
            <div className="type-selector-wrapper">
              <span className="type-icon">{element.elementType === 'checkbox' ? '☑' : 'T'}</span>
              <select value={element.elementType} onChange={(e) => onUpdate('elementType', e.target.value)} className="type-select">
                <option value="text">Text answer</option>
                <option value="checkbox">Checkbox</option>
              </select>
              <button className="delete-btn" onClick={() => deleteElement(element.id)}><Trash2 size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="add-tooltip">
        <button className="tooltip-btn" onClick={() => addElement(pageId, 'question', parentId, element.id)}>
          <img src="/src/assets/question.png" alt="" style={{height: 16}} />
          <span>Question</span>
        </button>
        <button className="tooltip-btn" onClick={() => addElement(pageId, 'section', parentId, element.id)}>
          <img src="/src/assets/section.png" alt="" style={{height: 16}} />
          <span>Section</span>
        </button>
      </div>
    </div>
  );
});

SortableElement.displayName = 'SortableElement';
export default SortableElement;
