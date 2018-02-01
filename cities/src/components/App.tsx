import React from 'react';
import Layout from './Common/Layout';
import Game from './Game';

const App = (props: any) => {
  return (
    <Layout>
      <Game {...props} />
    </Layout>
  );
};

export default App;
