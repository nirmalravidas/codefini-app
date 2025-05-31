// types.ts

// Represents a single topic within a module
export interface Topic {
  topicId: string;
  topicTitle: string;
  topicContent: string;
  position: number;
}

// Represents a module within a course
export interface CourseModule {
  moduleId: string;
  moduleTitle: string;
  moduleDescription: string;
  position: number;
  topics: Topic[];
}

// Represents minimal course information used for displaying course cards (from index.json)
export interface CourseMeta {
  id: string;
  index: number;
  slug: string;
  language: string;
  courseTitle: string;
  courseDescription: string;
  courseBannerImageLink: string;
  pricingType: string;
  bookmarked: boolean;
  totalModules: number;
}

// Represents full course details including modules and topics (fetched by slug)
export interface CourseDetails extends CourseMeta {
  modules: CourseModule[];
}

// Props for CourseCard component
export interface CourseCardProps {
  course: CourseMeta;
}

// Zustand store interface for managing courses and bookmarks
export interface CourseHubStore {
  courseMetaList: CourseMeta[]; // Used to render course cards
  courseDetailsMap: Record<string, CourseDetails>; // Lazy-loaded full course data by slug or id
  bookmarks: string[]; // IDs of bookmarked courses
  isLoading: boolean;
  error: string | null;

  // Fetch all course metadata (for overview/cards)
  fetchAllCoursesMeta: () => Promise<void>;

  // Fetch full course details by slug (lazy loaded on demand)
  fetchCourseBySlug: (slug: string) => Promise<void>;

  // Bookmark utilities
  loadBookmarks: () => Promise<void>;
  addBookmark: (courseId: string) => Promise<void>;
  removeBookmark: (courseId: string) => Promise<void>;

  // Helpers
  getCourseById: (courseId: string) => CourseDetails | undefined;
}

export interface CodeState {
  code: string;
  input: string;
  language: string;
  output: string;
  setCode: (code: string) => void;
  setInput: (input: string) => void;
  setLanguage: (lang: string) => void;
  setOutput: (output: string) => void;
}