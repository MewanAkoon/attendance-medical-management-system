import icon1 from './courses/1.svg';
import icon2 from './courses/2.svg';
import icon3 from './courses/3.svg';
import icon4 from './courses/4.svg';
import icon5 from './courses/5.svg';
import icon6 from './courses/6.svg';
import icon7 from './courses/7.svg';

const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7];

const getIcon = () => {
  const index = Math.floor(Math.random() * icons.length);
  return icons[index];
}

export default getIcon;