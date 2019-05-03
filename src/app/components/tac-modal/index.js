import React from 'react'

export default () => (
  <div className="modal">
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Terms and Conditions</p>
        <button className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
      </section>
      <footer className="modal-card-foot">
        <button className="button is-success">Accept</button>
        <button className="button">Cancel</button>
      </footer>
    </div>
  </div>
)
