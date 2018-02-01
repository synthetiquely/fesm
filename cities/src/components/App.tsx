import * as React from 'react';
import Layout from './Common/Layout';
import Form from './Form';
import Map from './Map';

const App = () => (
  <Layout>
    <div className="columns is-centered">
      <div className="column is-narrow">
        <Form />
      </div>
    </div>
    <div className="columns is-centered">
      <div className="column is-narrow">
        <Map />
      </div>
    </div>
  </Layout>
);

export default App;
