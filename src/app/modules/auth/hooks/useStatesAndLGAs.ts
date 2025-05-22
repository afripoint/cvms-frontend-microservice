import { useState, useEffect, useCallback } from 'react';

export interface State {
  id: number;
  uuid: string;
  name: string;
}

export interface County {
  id: number;
  uuid: string;
  state_uuid: string;
  name: string;
}

export const useStatesAndCounties = () => {
  const [states, setStates] = useState<State[]>([]);
  const [counties, setCounties] = useState<County[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStates = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://nga-states-lga.onrender.com/fetch');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // The API returns an array of strings directly
      const stateNames = await response.json();
      
      if (!Array.isArray(stateNames)) {
        throw new Error('Invalid response format - expected array of state names');
      }

      const formattedStates = stateNames.map((stateName, index) => ({
        id: index + 1,
        uuid: `${stateName.toLowerCase().replace(/\s+/g, '-')}-uuid`,
        name: stateName
      }));
      
      setStates(formattedStates);
      setLoading(false);
    } catch (err) {
      console.error('Error loading states:', err);
      setError('Failed to load states data. Please try refreshing the page.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  const fetchCountiesForState = useCallback(async (stateUuid: string): Promise<County[]> => {
    if (!stateUuid) return [];
    
    setLoading(true);
    
    try {
      const state = states.find(s => s.uuid === stateUuid);
      if (!state) {
        throw new Error('State not found');
      }
      
      const response = await fetch(
        `https://nga-states-lga.onrender.com/?state=${encodeURIComponent(state.name)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // The LGA endpoint returns an array of strings directly
      const countyNames = await response.json();
      
      if (!Array.isArray(countyNames)) {
        throw new Error('Invalid response format - expected array of county names');
      }

      const stateCounties = countyNames.map((countyName, index) => ({
        id: index + 1,
        uuid: `${stateUuid}-county-${index + 1}`,
        state_uuid: stateUuid,
        name: countyName
      }));
      
      setCounties(prev => [
        ...prev.filter(county => county.state_uuid !== stateUuid),
        ...stateCounties
      ]);
      
      setLoading(false);
      return stateCounties;
    } catch (err) {
      console.error(`Error fetching counties for state ${stateUuid}:`, err);
      setLoading(false);
      return [];
    }
  }, [states]);

  const getCountiesByState = useCallback(async (stateUuid: string) => {
    const existingCounties = counties.filter(county => county.state_uuid === stateUuid);
    if (existingCounties.length > 0) {
      return existingCounties;
    }
    return await fetchCountiesForState(stateUuid);
  }, [counties, fetchCountiesForState]);

  const getStateUuidByName = useCallback((stateName: string) => {
    const state = states.find(s => s.name === stateName);
    return state ? state.uuid : null;
  }, [states]);

  const getStateByUuid = useCallback((stateUuid: string) => {
    return states.find(s => s.uuid === stateUuid) || null;
  }, [states]);

  return { 
    states, 
    counties, 
    loading, 
    error,
    getCountiesByState,
    getStateUuidByName,
    getStateByUuid,
    fetchCountiesForState
  };
};