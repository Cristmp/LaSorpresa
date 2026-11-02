export const COURSES_NAVIGATION_REQUEST = 'courses-navigation-request';

export const requestCoursesNavigation = () => {
  window.dispatchEvent(new Event(COURSES_NAVIGATION_REQUEST));
};
