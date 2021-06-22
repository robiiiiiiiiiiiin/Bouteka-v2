import React from 'react';
 
const Loading = React.forwardRef<HTMLDivElement, object>((props, ref) => {
  return (
    <div ref={ref} className="loading">
        loading
    </div>
  )
})
 
export default Loading;