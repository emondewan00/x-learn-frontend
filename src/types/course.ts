interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  published: boolean;
  modules: string[];
  enrolledCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default Course;
