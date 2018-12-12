import React from 'react';

const Header = (props) => (// This creates a React Component
      <div className="header">
        <div className="container">
          <h1 className="header__title">{props.title}</h1> 
          {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
        </div>
      </div>  
);

Header.defaultProps = { 
title: 'Decision Maker' // If no title prop is set, this default title will render 
}

export default Header;
