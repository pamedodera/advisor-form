import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ResizeHandleProps {
  onResize: (newWidth: number) => void;
  minWidth?: number;
  maxWidth?: number;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ 
  onResize, 
  minWidth = 300, 
  maxWidth = 800 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const handleRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    
    // Get the current width of the panel by finding the container
    const container = handleRef.current?.parentElement;
    if (container) {
      const panel = container.querySelector('[style*="width"]') as HTMLElement;
      if (panel) {
        const currentWidth = parseInt(panel.style.width) || 600;
        setStartWidth(currentWidth);
      }
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    // Calculate the change in mouse position
    const deltaX = e.clientX - startX;
    const newPanelWidth = startWidth + deltaX;
    
    // Clamp the width between min and max values
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newPanelWidth));
    onResize(clampedWidth);
  }, [isDragging, onResize, minWidth, maxWidth, startX, startWidth]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={handleRef}
      className={`
        w-1 
        bg-gray-300 
        hover:bg-dark-blue-500 
        cursor-ew-resize 
        transition-colors
        ${isDragging ? 'bg-dark-blue-500' : ''}
      `}
      onMouseDown={handleMouseDown}
    />
  );
};

export default ResizeHandle;