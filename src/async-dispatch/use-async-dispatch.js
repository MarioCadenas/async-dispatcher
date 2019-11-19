import React, { useEffect, useState } from 'react';

export const useAsyncDispatch = actions => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const dispatchedActions = actions.map(async action =>
          asyncDispatcher.dispatch.apply(null, action())
        );
        const result = await Promise.all(dispatchedActions);
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchActions();
  }, [actions]);

  return {
    data,
    loading,
    error
  };
};
