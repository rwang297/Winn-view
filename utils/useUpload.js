import React from 'react';

function useUpload() {
  const [loading, setLoading] = React.useState(false);
  const upload = React.useCallback(async (input) => {
    // No backend integration - return error
    return { error: 'Upload functionality requires backend integration' };
  }, []);

  return [upload, { loading }];
}

export default useUpload;
