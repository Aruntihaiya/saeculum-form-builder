import React, { useState } from 'react';
import { useForm } from '../../context/formcontext';
import { MoreVertical, Trash2 } from 'lucide-react';

const PageHeader = ({ page, index }) => {
  const { updatePage, deletePage } = useForm();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
            <span className="page-number">{index + 1}- Page</span>
        </div>
        
        <div style={{position: 'relative'}}>
          <button className="icon-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MoreVertical size={18} />
          </button>
          
          {isMenuOpen && (
              <>
                  <div className="click-backdrop" onClick={() => setIsMenuOpen(false)} />
                  <div className="dropdown-menu">
                      <button className="dropdown-item delete" onClick={() => {
                         
                              deletePage(page.id);
                          
                          setIsMenuOpen(false);
                      }}>
                          <Trash2 size={14} />
                          <span>delete page</span>
                      </button>
                  </div>
              </>
          )}
        </div>
      </div>
      <div className="page-description">
        The header is the first page of your report. The user is asked to select an entity if multiple ones exist and if no schedule is set.
      </div>
    </>
  );
};

export default PageHeader;
