import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';
import SocialJSApp from './App';

/*
test('renders learn react link', () => {
  const { getByText } = render(<SocialJSApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

it('renders without crashing', () => {
  const div = document.createElement('div');
  // Эта div находится только в памяти
  // мы рендерим в нее <App />
  // и если все хорошо, то она в памяти отрендерится
  ReactDOM.render(<SocialJSApp />, div);
  // демонтируем из это div, то что вмантировали
  ReactDOM.unmountComponentAtNode(div);
});