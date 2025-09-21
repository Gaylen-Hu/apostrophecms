import { navButton } from './js/nav-buttons';
import './js/navigation';
import AOS from 'aos';

export default () => {
  AOS.init();
  navButton();
  // Your own project level JS may go here
};
