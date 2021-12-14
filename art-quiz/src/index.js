import Start from './quiz/start.js';
import Category from './quiz/category.js';
import Quiz from './quiz/quiz.js';
import Settings from './quiz/settings.js';
import Utils from './route/route.js';
import Final from './quiz/final.js';

const routes = {
  '/': Start,
  '/category': Category,
  '/quiz': Quiz,
  '/start': Start,
  '/settings': Settings,
  '/final': Final,

};

const router = async () => {
  const content = null || document.getElementById('app');
  const request = Utils.parseRequestURL();
  const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');
  const Page = routes[parsedURL];
  const newPage = new Page();

  content.classList.add('transition');
  await Utils.sleep(300);
  content.innerHTML = await newPage.render();
  content.classList.remove('transition');
  await newPage.afterRender();
};

// Listen on hash change:
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Audio
document.addEventListener('load', () => {
  document.querySelector('.audio1').play();
});
