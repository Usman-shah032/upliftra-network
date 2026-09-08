import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, CourseModule } from '../../types';
import {
  BookOpen,
  GraduationCap,
  Clock,
  Award,
  Star,
  Users,
  PlayCircle,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Search,
  Check,
  X,
  Share2,
  Download,
  FileText,
  Video,
  Layers,
  ChevronDown,
  ChevronUp,
  Flame,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const LearningHub: React.FC = () => {
  const { courses, toggleEnrollCourse, toggleLessonComplete, currentUser } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const categories = [
    'all',
    'Software Engineering',
    'Higher Studies & Scholarships',
    'AI & Machine Learning',
    'Product & Business'
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      c.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesLevel =
      selectedLevel === 'all' ||
      c.level.toLowerCase() === selectedLevel.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skillsEarned.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleOpenCourseModal = (course: Course) => {
    setSelectedCourse(course);
    // Expand first module by default
    if (course.modules && course.modules.length > 0) {
      const firstMod = course.modules[0];
      if (typeof firstMod === 'object' && firstMod.id) {
        setExpandedModuleId(firstMod.id);
        if (firstMod.lessons && firstMod.lessons.length > 0) {
          setActiveLessonId(firstMod.lessons[0].id);
        }
      }
    }
  };

  const handleToggleLesson = (courseId: string, lessonId: string) => {
    toggleLessonComplete(courseId, lessonId);
    // Refresh selected course view
    const updated = courses.find((c) => c.id === courseId);
    if (updated) {
      setSelectedCourse(updated);
    }
  };

  const handleShareCourse = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Find active course instance from context
  const activeCourse = selectedCourse
    ? courses.find((c) => c.id === selectedCourse.id) || selectedCourse
    : null;

  return (
    <div className="py-8 sm:py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-400/30 text-xs font-semibold">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Tailored Curricula for Pakistan & Global Remote Careers</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Skill & Learning Academy
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Free industry-crafted masterclasses designed to bridge Pakistani academic curricula with international remote software engineering standards, Fulbright & Chevening scholarships, and Silicon Valley-style product execution.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[130px]">
                <div className="text-2xl font-black text-cyan-300">100% Free</div>
                <div className="text-[11px] font-medium text-slate-300">No Paywalls</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[130px]">
                <div className="text-2xl font-black text-emerald-300">Verified</div>
                <div className="text-[11px] font-medium text-slate-300">Certificates Included</div>
              </div>
            </div>
          </div>
        </div>

        {/* Guided Career Pathways Carousel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Featured Career Tracks
              </h2>
            </div>
            <span className="text-xs text-slate-500">Curated multi-course roadmaps</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-2">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Software Engineering Track
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Undergrad to Remote USD Engineer
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                TypeScript, Docker, AWS ECS, System Design & LeetCode interview mastery.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1">
                <span>3 Courses • 14 Weeks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 space-y-2">
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Global Academic Track
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Fulbright & Chevening Scholar Roadmap
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Statement of Purpose formulation, research proposal drafting & mock panel interviews.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 gap-1">
                <span>2 Courses • 8 Weeks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 space-y-2">
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                AI & Innovation Track
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Generative AI & LLM Architect
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Gemini SDK, RAG vector pipelines, autonomous agents, and LangGraph multi-agent workflows.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 gap-1">
                <span>2 Courses • 10 Weeks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="search-courses-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, skills, instructors..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Level Pills */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                    selectedLevel.toLowerCase() === lvl.toLowerCase()
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {lvl === 'all' ? 'All Levels' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail */}
                <div
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => handleOpenCourseModal(course)}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-cyan-300 text-[11px] font-bold uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>

                  {course.isEnrolled ? (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3" />
                        <span>Enrolled ({course.progressPercentage || 0}%)</span>
                      </span>
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-bold">
                        Free Masterclass
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1 font-semibold text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>{course.rating}</span>
                      <span className="text-slate-300 font-normal">({course.enrolledCount.toLocaleString()} enrolled)</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-200">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="capitalize font-semibold text-blue-600 dark:text-blue-400">
                      {course.level} Level
                    </span>
                    <span className="text-slate-400 font-medium">
                      {course.modulesCount} Comprehensive Modules
                    </span>
                  </div>

                  <h3
                    onClick={() => handleOpenCourseModal(course)}
                    className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 transition cursor-pointer"
                  >
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    {course.instructorAvatar && (
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <div className="text-xs text-slate-600 dark:text-slate-300 truncate">
                      <span className="font-semibold text-slate-900 dark:text-white">{course.instructor}</span>
                      {course.instructorTitle && (
                        <span className="text-slate-500 block text-[11px] truncate">
                          {course.instructorTitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {course.skillsEarned.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {course.skillsEarned.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px]">
                        +{course.skillsEarned.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Progress Bar if enrolled */}
                  {course.isEnrolled && (
                    <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Course Progress</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {course.progressPercentage || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${course.progressPercentage || 0}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex gap-2">
                <button
                  id={`btn-view-details-${course.id}`}
                  onClick={() => handleOpenCourseModal(course)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition text-center"
                >
                  Syllabus & Details
                </button>
                <button
                  id={`btn-enroll-course-${course.id}`}
                  onClick={() => {
                    toggleEnrollCourse(course.id);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                    course.isEnrolled
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{course.isEnrolled ? 'Continue' : 'Enroll Free'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              No courses matched your search criteria
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search keywords or clearing the category and level filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Course Detail & Interactive Syllabus Modal */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div
            id="course-detail-modal"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-600 text-white">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                    {activeCourse.category} • {activeCourse.level} Level
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white line-clamp-1">
                    {activeCourse.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* Simulated Video Player / Preview */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video max-h-72 border border-slate-800 flex items-center justify-center group shadow-inner">
                <img
                  src={activeCourse.thumbnail}
                  alt={activeCourse.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xs"
                />
                <div className="relative z-10 text-center space-y-3 p-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center mx-auto shadow-xl hover:scale-110 transition cursor-pointer">
                    <PlayCircle className="w-8 h-8 ml-0.5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-cyan-300">
                      Lesson Stream: {activeLessonId ? 'Interactive Session Ready' : 'Introduction & Overview'}
                    </div>
                    <p className="text-[11px] text-slate-300 max-w-sm">
                      {activeCourse.instructor} • {activeCourse.organization}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress & Enrollment Action Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Your Progress: {activeCourse.progressPercentage || 0}% Complete
                    </span>
                    {activeCourse.progressPercentage === 100 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                        Completed!
                      </span>
                    )}
                  </div>
                  <div className="w-48 sm:w-64 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${activeCourse.progressPercentage || 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareCourse}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 flex items-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>

                  {activeCourse.progressPercentage === 100 || activeCourse.certificateAvailable ? (
                    <button
                      onClick={() => setShowCertificateModal(true)}
                      className="px-3.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Award className="w-4 h-4" />
                      <span>Certificate</span>
                    </button>
                  ) : null}

                  <button
                    onClick={() => toggleEnrollCourse(activeCourse.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      activeCourse.isEnrolled
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{activeCourse.isEnrolled ? 'Enrolled' : 'Enroll Now (Free)'}</span>
                  </button>
                </div>
              </div>

              {/* Course Overview & Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Course Description
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {activeCourse.description}
                    </p>
                  </div>

                  {/* Skills Earned */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                      Skills & Competencies Gained
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCourse.skillsEarned.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-300 border border-blue-100 dark:border-blue-900/50 text-xs font-semibold"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {activeCourse.prerequisites && (
                    <div className="space-y-2 pt-2">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                        Prerequisites
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        {activeCourse.prerequisites.map((p, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Instructor Card */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 space-y-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Lead Instructor
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        activeCourse.instructorAvatar ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
                      }
                      alt={activeCourse.instructor}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {activeCourse.instructor}
                      </h5>
                      <p className="text-[11px] text-slate-500">
                        {activeCourse.instructorTitle || activeCourse.organization}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Provider:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{activeCourse.organization}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Duration:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{activeCourse.duration}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Curriculum / Syllabus Breakdown */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      Interactive Syllabus & Module Tracker
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500">
                    Click lessons to mark completion
                  </span>
                </div>

                <div className="space-y-3">
                  {activeCourse.modules &&
                    activeCourse.modules.map((modItem: any, idx: number) => {
                      const isObj = typeof modItem === 'object';
                      const modTitle = isObj ? modItem.title : modItem;
                      const modId = isObj ? modItem.id || `mod_${idx}` : `mod_${idx}`;
                      const isExpanded = expandedModuleId === modId;
                      const lessons = isObj && modItem.lessons ? modItem.lessons : [];

                      return (
                        <div
                          key={modId}
                          className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900"
                        >
                          <button
                            onClick={() => setExpandedModuleId(isExpanded ? null : modId)}
                            className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-left transition"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-md bg-blue-600/10 text-blue-600 font-bold text-xs flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <div>
                                <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                  {modTitle}
                                </h5>
                                {isObj && modItem.duration && (
                                  <span className="text-[11px] text-slate-500">{modItem.duration}</span>
                                )}
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="p-3 space-y-2 border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/60">
                              {lessons.length > 0 ? (
                                lessons.map((lesson: any) => {
                                  const isDone = (activeCourse.completedLessonIds || []).includes(lesson.id);
                                  return (
                                    <div
                                      key={lesson.id}
                                      className="pt-2 first:pt-0 flex items-center justify-between text-xs py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/30 px-2 rounded-lg transition"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <button
                                          onClick={() => handleToggleLesson(activeCourse.id, lesson.id)}
                                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                                            isDone
                                              ? 'bg-emerald-500 border-emerald-500 text-white'
                                              : 'border-slate-300 dark:border-slate-600 text-transparent hover:border-blue-500'
                                          }`}
                                        >
                                          <Check className="w-3.5 h-3.5" />
                                        </button>
                                        <div
                                          onClick={() => setActiveLessonId(lesson.id)}
                                          className="cursor-pointer"
                                        >
                                          <span
                                            className={`font-medium ${
                                              isDone
                                                ? 'line-through text-slate-400'
                                                : 'text-slate-800 dark:text-slate-200'
                                            }`}
                                          >
                                            {lesson.title}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                                        <span>{lesson.duration}</span>
                                        {lesson.type === 'assignment' ? (
                                          <FileText className="w-3.5 h-3.5 text-purple-400" />
                                        ) : (
                                          <Video className="w-3.5 h-3.5 text-blue-400" />
                                        )}
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <p className="text-xs text-slate-500 p-2">
                                  Lessons and hands-on exercises available upon enrollment.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Close Syllabus
              </button>
              <button
                onClick={() => {
                  toggleEnrollCourse(activeCourse.id);
                  if (!activeCourse.isEnrolled) {
                    setSelectedCourse((prev) => (prev ? { ...prev, isEnrolled: true, progressPercentage: 10 } : null));
                  }
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                <span>{activeCourse.isEnrolled ? 'Continue Study Session' : 'Enroll in Free Masterclass'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificateModal && activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Preview Frame */}
            <div className="border-4 border-double border-amber-600/50 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-center space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest">
                <ShieldCheck className="w-5 h-5" />
                <span>Upliftra Network Verified Certificate</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Certificate of Competency
              </h2>

              <p className="text-xs text-slate-500">This certifies that</p>

              <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-cyan-400 border-b border-dashed border-slate-300 dark:border-slate-700 pb-1 max-w-xs mx-auto">
                {currentUser?.name || 'Verified Scholar / Engineer'}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                has successfully completed the comprehensive curriculum and hands-on capstone assessments for:
              </p>

              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                {activeCourse.title}
              </h4>

              <div className="pt-4 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <strong>Instructor:</strong> {activeCourse.instructor}
                </div>
                <div>
                  <strong>Issued:</strong> {new Date().toLocaleDateString()}
                </div>
                <div>
                  <strong>ID:</strong> UPL-CERT-{activeCourse.id.toUpperCase()}-2025
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const printWin = window.open('', '_blank');
                  if (printWin) {
                    printWin.document.write(`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <title>Upliftra Network - Certificate of Competency</title>
                          <style>
                            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; text-align: center; background: #f8fafc; }
                            .cert { border: 8px double #0044B2; padding: 40px; background: white; border-radius: 16px; max-width: 800px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
                            .logo { max-height: 60px; margin-bottom: 15px; }
                            .title { font-size: 28px; font-weight: 800; color: #0f172a; margin: 8px 0; text-transform: uppercase; letter-spacing: 2px; }
                            .name { font-size: 26px; font-weight: bold; color: #0052CC; border-bottom: 2px dashed #cbd5e1; display: inline-block; padding: 5px 30px; margin: 15px 0; }
                            .course { font-size: 20px; font-weight: 700; color: #1e293b; margin: 12px 0; }
                            .footer { margin-top: 35px; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; color: #64748b; }
                          </style>
                        </head>
                        <body>
                          <div class="cert">
                            <img src="/upliftra-logo.png" class="logo" alt="Upliftra Network" />
                            <div style="font-size: 12px; font-weight: bold; color: #d97706; text-transform: uppercase; letter-spacing: 2px;">Official Verified Credential</div>
                            <h1 class="title">Certificate of Competency</h1>
                            <div style="color: #64748b; font-size: 13px;">Awarded to</div>
                            <div class="name">${currentUser?.name || 'Verified Scholar / Engineer'}</div>
                            <p style="color: #475569; font-size: 13px; max-width: 550px; margin: 10px auto;">for successfully completing all curriculum modules, assessments, and verifiable capstones for</p>
                            <div class="course">${activeCourse.title}</div>
                            <div style="color: #64748b; font-size: 12px;">Instructor: <strong>${activeCourse.instructor}</strong> (${activeCourse.organization})</div>
                            <div class="footer">
                              <div>Issued: ${new Date().toLocaleDateString()}</div>
                              <div>ID: UPL-CERT-${activeCourse.id.toUpperCase()}-${new Date().getFullYear()}</div>
                              <div>Verify: upliftra.pk/verify</div>
                            </div>
                          </div>
                          <script>
                            window.onload = function() { setTimeout(() => window.print(), 300); }
                          <\/script>
                        </body>
                      </html>
                    `);
                    printWin.document.close();
                  }
                  setShowCertificateModal(false);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-xs transition"
              >
                <Download className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
