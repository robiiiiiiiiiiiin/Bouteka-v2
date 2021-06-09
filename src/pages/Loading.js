import React from 'react';
 
const Loading = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="loading">
        loading
    </div>
  )
})
 
export default Loading;