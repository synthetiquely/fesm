import * as React from 'react';

const Layout = (props: any) => (
  <React.Fragment>
    <header className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Города</h1>
          <h2 className="subtitle">
            Реализация игры "Города", в которой каждый участник называет
            существующий город любой страны, название которого начинается на ту
            букву, которой оканачивается название предыдущего участника.
          </h2>
        </div>
      </div>
    </header>

    <main className="container is-fluid">
      <section className="section">{props.children}</section>
    </main>
  </React.Fragment>
);

export default Layout;
