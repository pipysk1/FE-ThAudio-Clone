import { Route, Routes } from 'react-router-dom';
import { Public, Home, Player } from './pages';
import path from './ultis/path';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as action from './store/actions';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.getDataStore(1, 10)); // Dispatch action với các tham số page và limit
  }, [dispatch]);

  return (
    <div className='w-full'>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PLAYER} element={<Player />} />
          <Route path={path.STAR} element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}
