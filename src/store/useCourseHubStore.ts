import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAllCoursesMeta, fetchCourseBySlug } from '@/src/services/api/coursedata.api';
import { CourseMeta, CourseDetails, CourseHubStore } from '@/src/types/types';

export const useCourseHubStore = create<CourseHubStore>()(
  immer((set, get) => ({
    courseMetaList: [],
    courseDetailsMap: {},
    bookmarks: [],
    isLoading: false,
    error: null,

    fetchAllCoursesMeta: async () => {
      //console.log('[CourseStore] fetchAllCoursesMeta: start');
      try {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        const meta = await fetchAllCoursesMeta();
        //console.log('[CourseStore] fetchAllCoursesMeta: success', meta);

        set((state) => {
          state.courseMetaList = meta;
          state.isLoading = false;
        });
      } catch (error: any) {
        //console.error('[CourseStore] fetchAllCoursesMeta: error', error);

        set((state) => {
          state.error = error.message || 'Failed to fetch course metadata.';
          state.isLoading = false;
        });
      }
    },

    fetchCourseBySlug: async (slug: string) => {
      if (get().courseDetailsMap[slug]) {
        // console.log(`[CourseStore] fetchCourseBySlug: '${slug}' already fetched`);
        return;
      }

      // console.log(`[CourseStore] fetchCourseBySlug: fetching '${slug}'`);
      try {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        const details = await fetchCourseBySlug(slug);
        // console.log(`[CourseStore] fetchCourseBySlug: success '${slug}'`, details);

        set((state) => {
          state.courseDetailsMap[slug] = details;
          state.isLoading = false;
        });
      } catch (error: any) {
        // console.error(`[CourseStore] fetchCourseBySlug: error '${slug}'`, error);

        set((state) => {
          state.error = error.message || 'Failed to fetch course details.';
          state.isLoading = false;
        });
      }
    },

    loadBookmarks: async () => {
      //console.log('[CourseStore] loadBookmarks: start');
      try {
        const stored = await AsyncStorage.getItem('bookmarks');
        if (stored) {
          //console.log('[CourseStore] loadBookmarks: loaded', stored);
          set((state) => {
            state.bookmarks = JSON.parse(stored);
          });
        }
      } catch (error) {
        //console.error('[CourseStore] loadBookmarks: error', error);
      }
    },

    addBookmark: async (courseId: string) => {
      console.log(`[CourseStore] addBookmark: adding '${courseId}'`);
      set((state) => {
        if (!state.bookmarks.includes(courseId)) {
          state.bookmarks.push(courseId);
        }
      });

      await AsyncStorage.setItem('bookmarks', JSON.stringify(get().bookmarks));
      //console.log('[CourseStore] addBookmark: saved to AsyncStorage');
    },

    removeBookmark: async (courseId: string) => {
      //console.log(`[CourseStore] removeBookmark: removing '${courseId}'`);
      set((state) => {
        state.bookmarks = state.bookmarks.filter((id) => id !== courseId);
      });

      await AsyncStorage.setItem('bookmarks', JSON.stringify(get().bookmarks));
      //console.log('[CourseStore] removeBookmark: updated AsyncStorage');
    },

    getCourseById: (courseId: string) => {
      const course = Object.values(get().courseDetailsMap).find((c) => c.id === courseId);
     // console.log(`[CourseStore] getCourseById: '${courseId}'`, course);
      return course;
    },
  }))
);

