import axios from 'axios';

const BASE_URL = 'https://raw.githubusercontent.com/nirmalravidas/e-learning-programming-course-app-server/main/data/courses/programming';

export const fetchAllCoursesMeta = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/index.json`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Unable to fetch courses');
  }
};

export const fetchCourseBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${slug}.json`);
    return response.data;
  } catch (error) {
    throw new Error('Unable to fetch course');
  }
};
