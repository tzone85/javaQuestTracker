import { Phase, WeekTask } from './types';

export const phases: Phase[] = [
  { id: 1, title: 'The TDD Awakening', subtitle: 'Weeks 1–4', weeks: [1, 2, 3, 4], emoji: '⚔️' },
  { id: 2, title: 'Spring Boot & The Backend Craft', subtitle: 'Weeks 5–9', weeks: [5, 6, 7, 8, 9], emoji: '🏗️' },
  { id: 3, title: 'Distributed Systems & Cloud', subtitle: 'Weeks 10–14', weeks: [10, 11, 12, 13, 14], emoji: '☁️' },
  { id: 4, title: 'Pair Programming, Consultancy & Polish', subtitle: 'Weeks 15–20', weeks: [15, 16, 17, 18, 19, 20], emoji: '🤝' },
  { id: 5, title: 'Portfolio, Application & Interview Prep', subtitle: 'Weeks 21–24', weeks: [21, 22, 23, 24], emoji: '🏁' },
];

export const weekTitles: Record<number, string> = {
  1: 'Java Sharpening & Tooling Setup',
  2: 'TDD: Red, Green, Refactor',
  3: 'Kata Immersion',
  4: 'Mocking, Stubs & Testing Patterns',
  5: 'Spring Boot Foundations',
  6: 'REST APIs Done Right',
  7: 'Databases: JPA, Hibernate & SQL',
  8: 'Testing the Spring Stack',
  9: 'Code Quality & Craft',
  10: 'Microservices Architecture',
  11: 'Docker',
  12: 'Messaging & Events',
  13: 'CI/CD Pipelines',
  14: 'Cloud Fundamentals & System Design',
  15: 'Pair Programming (Part 1)',
  16: 'Pair Programming (Part 2)',
  17: 'Consultancy Mindset (Part 1)',
  18: 'Consultancy Mindset (Part 2)',
  19: 'Architecture Deep Dives (Part 1)',
  20: 'Architecture Deep Dives (Part 2)',
  21: 'Polish Your Portfolio (Part 1)',
  22: 'Polish Your Portfolio (Part 2)',
  23: 'The Mock Interview',
  24: 'Application & Final Preparation',
};

// Helper to create task IDs
const t = (week: number, day: number, task: number): string => `w${week}d${day}t${task}`;

export const tasks: WeekTask[] = [
  // ============================================================
  // WEEK 1 — Java Sharpening & Tooling Setup
  // ============================================================
  { id: t(1,1,1), week: 1, day: 1, title: 'Install Java 21 LTS', description: 'Download and install Java 21 (LTS) on your machine.' },
  { id: t(1,1,2), week: 1, day: 1, title: 'Install IntelliJ IDEA', description: 'Set up IntelliJ IDEA (Community or Ultimate edition).' },
  { id: t(1,1,3), week: 1, day: 1, title: 'Set up Maven or Gradle', description: 'Configure your preferred build tool and create a sample project.' },
  { id: t(1,2,1), week: 1, day: 2, title: 'Revise OOP: Encapsulation & Inheritance', description: 'Review encapsulation (access modifiers, getters/setters) and inheritance (extends, super).' },
  { id: t(1,2,2), week: 1, day: 2, title: 'Revise OOP: Polymorphism & Abstraction', description: 'Review polymorphism (method overriding, interfaces) and abstraction (abstract classes).' },
  { id: t(1,3,1), week: 1, day: 3, title: 'Revise Generics', description: 'Practice type parameters, bounded types, wildcard types (? extends, ? super).' },
  { id: t(1,3,2), week: 1, day: 3, title: 'Revise Collections', description: 'Review List, Set, Map, Queue — know when to use each and their implementations.' },
  { id: t(1,4,1), week: 1, day: 4, title: 'Revise Streams & Lambdas', description: 'Practice filter, map, reduce, collect, flatMap, and lambda syntax.' },
  { id: t(1,4,2), week: 1, day: 4, title: 'Revise Optional', description: 'Practice Optional.of, ofNullable, map, flatMap, orElse, orElseThrow.' },
  { id: t(1,4,3), week: 1, day: 4, title: 'Write 5 stream/lambda programs', description: 'Write 5 small programs using streams and lambdas you wouldn\'t have before.' },
  { id: t(1,5,1), week: 1, day: 5, title: 'Write 5 more stream/lambda programs', description: 'Complete your set of 10 stream/lambda practice programs.' },
  { id: t(1,5,2), week: 1, day: 5, title: 'Read Clean Code Ch. 1–3', description: 'Read chapters 1 (Clean Code), 2 (Meaningful Names), 3 (Functions).' },
  { id: t(1,6,1), week: 1, day: 6, title: 'Read Clean Code Ch. 4–5, 9–11', description: 'Read chapters 4 (Comments), 5 (Formatting), 9 (Unit Tests), 10 (Classes), 11 (Systems).' },
  { id: t(1,6,2), week: 1, day: 6, title: 'Take Pluralsight Java Skill IQ', description: 'Take the Java Skill IQ assessment to identify your gaps.' },
  { id: t(1,6,3), week: 1, day: 6, title: 'Refactor old code', description: 'Take messy code you\'ve written before and refactor it using Clean Code principles.' },

  // ============================================================
  // WEEK 2 — TDD: Red, Green, Refactor
  // ============================================================
  { id: t(2,1,1), week: 2, day: 1, title: 'Learn JUnit 5: @Test & @BeforeEach', description: 'Understand @Test annotation, test lifecycle, @BeforeEach setup methods.' },
  { id: t(2,1,2), week: 2, day: 1, title: 'Learn JUnit 5: Assertions', description: 'Practice assertEquals, assertTrue, assertThrows, assertAll.' },
  { id: t(2,1,3), week: 2, day: 1, title: 'Daily kata (test-first)', description: 'Do one kata on kata-log.rocks — write the test first, always.' },
  { id: t(2,2,1), week: 2, day: 2, title: 'Learn JUnit 5: @ParameterizedTest', description: 'Practice parameterized tests with @ValueSource, @CsvSource, @MethodSource.' },
  { id: t(2,2,2), week: 2, day: 2, title: 'Learn JUnit 5: @Nested', description: 'Use @Nested to organize related tests into inner classes.' },
  { id: t(2,2,3), week: 2, day: 2, title: 'Daily kata (test-first)', description: 'Do one kata on codewars.com — write the test first, always.' },
  { id: t(2,3,1), week: 2, day: 3, title: 'Learn Mockito: @Mock & when()', description: 'Set up mock objects with @Mock, define behavior with when().thenReturn().' },
  { id: t(2,3,2), week: 2, day: 3, title: 'Learn Mockito: verify()', description: 'Verify method calls with verify(), times(), never().' },
  { id: t(2,3,3), week: 2, day: 3, title: 'Daily kata (test-first)', description: 'Do one kata — write the test first, always.' },
  { id: t(2,4,1), week: 2, day: 4, title: 'Learn AssertJ', description: 'Practice fluent assertions: assertThat().isEqualTo(), contains(), hasSize().' },
  { id: t(2,4,2), week: 2, day: 4, title: 'Read TDD By Example — Part 1 (first half)', description: 'Begin reading Part 1 of Kent Beck\'s TDD By Example.' },
  { id: t(2,4,3), week: 2, day: 4, title: 'Daily kata (test-first)', description: 'Do one kata — write the test first, always.' },
  { id: t(2,5,1), week: 2, day: 5, title: 'Read TDD By Example — Part 1 (second half)', description: 'Finish reading Part 1 of Kent Beck\'s TDD By Example.' },
  { id: t(2,5,2), week: 2, day: 5, title: 'Watch Dave Farley TDD series', description: 'Watch Dave Farley\'s "TDD in Java" videos on YouTube.' },
  { id: t(2,5,3), week: 2, day: 5, title: 'Daily kata (test-first)', description: 'Do one kata — write the test first, always.' },
  { id: t(2,6,1), week: 2, day: 6, title: 'Start Pluralsight TDD with JUnit 5', description: 'Begin the TDD with JUnit 5 course on Pluralsight.' },
  { id: t(2,6,2), week: 2, day: 6, title: 'Daily kata (test-first)', description: 'Do one kata — write the test first, always.' },

  // ============================================================
  // WEEK 3 — Kata Immersion
  // ============================================================
  { id: t(3,1,1), week: 3, day: 1, title: 'FizzBuzz kata (strict TDD)', description: 'Complete FizzBuzz using strict Red→Green→Refactor. Start with failing test, minimal code, refactor.' },
  { id: t(3,1,2), week: 3, day: 1, title: 'Commit after each green cycle', description: 'Git commit after every green step in your FizzBuzz kata.' },
  { id: t(3,2,1), week: 3, day: 2, title: 'Roman Numerals kata (strict TDD)', description: 'Complete Roman Numerals conversion using strict TDD. This exact kata has been used by EE.' },
  { id: t(3,2,2), week: 3, day: 2, title: 'Commit after each green cycle', description: 'Git commit after every green step in your Roman Numerals kata.' },
  { id: t(3,3,1), week: 3, day: 3, title: 'String Calculator kata (strict TDD)', description: 'Complete String Calculator using strict TDD. Handle edge cases and delimiters.' },
  { id: t(3,3,2), week: 3, day: 3, title: 'Commit after each green cycle', description: 'Git commit after every green step in your String Calculator kata.' },
  { id: t(3,4,1), week: 3, day: 4, title: 'Bowling Game kata (strict TDD)', description: 'Complete Bowling Game scoring using strict TDD. Handle spares, strikes, and the 10th frame.' },
  { id: t(3,4,2), week: 3, day: 4, title: 'Commit after each green cycle', description: 'Git commit after every green step in your Bowling Game kata.' },
  { id: t(3,5,1), week: 3, day: 5, title: 'Shopping Cart kata (strict TDD)', description: 'Complete Shopping Cart — EE\'s most common take-home. Add items, totals, discounts.' },
  { id: t(3,5,2), week: 3, day: 5, title: 'Commit after each green cycle', description: 'Git commit after every green step in your Shopping Cart kata.' },
  { id: t(3,6,1), week: 3, day: 6, title: 'Time yourself on a repeat kata', description: 'Redo one kata from this week, timing yourself. Build speed and confidence.' },
  { id: t(3,6,2), week: 3, day: 6, title: 'Review all kata code quality', description: 'Review all your kata solutions for clean code and refactoring opportunities.' },

  // ============================================================
  // WEEK 4 — Mocking, Stubs & Testing Patterns
  // ============================================================
  { id: t(4,1,1), week: 4, day: 1, title: 'Mock HTTP clients in tests', description: 'Practice mocking HTTP clients — never call real services in unit tests.' },
  { id: t(4,1,2), week: 4, day: 1, title: 'Mock database interactions', description: 'Practice mocking repositories/DAOs in unit tests.' },
  { id: t(4,2,1), week: 4, day: 2, title: 'Learn test types: Unit vs Integration vs E2E', description: 'Understand the difference, when to use each, and the test pyramid.' },
  { id: t(4,2,2), week: 4, day: 2, title: 'Learn Arrange-Act-Assert pattern', description: 'Structure all your tests using AAA. Practice with existing kata tests.' },
  { id: t(4,3,1), week: 4, day: 3, title: 'Learn test naming conventions', description: 'Adopt should_returnError_when_inputIsNull style naming for clarity.' },
  { id: t(4,3,2), week: 4, day: 3, title: 'Write positive AND negative tests', description: 'For each method, write both happy-path and error-path tests.' },
  { id: t(4,4,1), week: 4, day: 4, title: 'Explore BDD with Cucumber', description: 'Understand what BDD is, how Cucumber works, Given/When/Then syntax.' },
  { id: t(4,4,2), week: 4, day: 4, title: 'Mock external services', description: 'Practice mocking external API calls and verifying interactions.' },
  { id: t(4,5,1), week: 4, day: 5, title: 'BOSS BATTLE: Shopping Cart TDD (Part 1)', description: 'Build a fully TDD\'d Shopping Cart: add items, calculate totals.', isBossBattle: true },
  { id: t(4,5,2), week: 4, day: 5, title: 'BOSS BATTLE: Shopping Cart TDD (Part 2)', description: 'Add discount logic and edge cases — every line driven by a failing test.', isBossBattle: true },
  { id: t(4,6,1), week: 4, day: 6, title: 'BOSS BATTLE: Shopping Cart TDD (Part 3)', description: 'Polish, refactor, ensure all edge cases covered. Push to GitHub.', isBossBattle: true },
  { id: t(4,6,2), week: 4, day: 6, title: 'Write Shopping Cart README', description: 'Document your TDD Shopping Cart project — design decisions, how to run, how to test.' },

  // ============================================================
  // WEEK 5 — Spring Boot Foundations
  // ============================================================
  { id: t(5,1,1), week: 5, day: 1, title: 'Build "Hello World" Spring Boot app', description: 'Create a new Spring Boot project using Spring Initializr and run it.' },
  { id: t(5,1,2), week: 5, day: 1, title: 'Understand auto-configuration', description: 'Learn how Spring Boot auto-configures beans based on classpath.' },
  { id: t(5,2,1), week: 5, day: 2, title: 'Learn dependency injection', description: 'Understand constructor injection, @Autowired, and the IoC container.' },
  { id: t(5,2,2), week: 5, day: 2, title: 'Learn bean lifecycle', description: 'Understand @PostConstruct, @PreDestroy, bean scopes (singleton, prototype).' },
  { id: t(5,3,1), week: 5, day: 3, title: 'Learn @Component, @Service, @Repository', description: 'Understand stereotype annotations and when to use each.' },
  { id: t(5,3,2), week: 5, day: 3, title: 'Learn @Controller', description: 'Understand @Controller vs @RestController and request handling.' },
  { id: t(5,4,1), week: 5, day: 4, title: 'Learn application.properties/yml', description: 'Configure server port, database URL, custom properties.' },
  { id: t(5,4,2), week: 5, day: 4, title: 'Learn Spring Profiles', description: 'Use @Profile to separate dev vs prod configuration.' },
  { id: t(5,5,1), week: 5, day: 5, title: 'Pluralsight: Spring Boot Fundamentals (Part 1)', description: 'Follow the first half of the Spring Boot Fundamentals course.' },
  { id: t(5,5,2), week: 5, day: 5, title: 'Read spring.io/guides', description: 'Go through the official Spring getting started guides.' },
  { id: t(5,6,1), week: 5, day: 6, title: 'Pluralsight: Spring Boot Fundamentals (Part 2)', description: 'Complete the Spring Boot Fundamentals course on Pluralsight.' },

  // ============================================================
  // WEEK 6 — REST APIs Done Right
  // ============================================================
  { id: t(6,1,1), week: 6, day: 1, title: 'Learn HTTP verbs & status codes', description: 'Understand GET, POST, PUT, DELETE, PATCH and status codes (200, 201, 400, 404, 500).' },
  { id: t(6,1,2), week: 6, day: 1, title: 'Learn RESTful design principles', description: 'Resource naming, plural nouns, statelessness, HATEOAS concepts.' },
  { id: t(6,2,1), week: 6, day: 2, title: 'Build REST API: Project setup', description: 'Start building a Task Manager or Library API with @RestController.' },
  { id: t(6,2,2), week: 6, day: 2, title: 'Learn @RequestMapping annotations', description: 'Practice @GetMapping, @PostMapping, @PutMapping, @DeleteMapping.' },
  { id: t(6,3,1), week: 6, day: 3, title: 'Learn @PathVariable & @RequestBody', description: 'Handle URL parameters and JSON request bodies.' },
  { id: t(6,3,2), week: 6, day: 3, title: 'Learn @RequestParam & @Valid', description: 'Handle query parameters and input validation with Bean Validation.' },
  { id: t(6,4,1), week: 6, day: 4, title: 'Learn exception handling', description: 'Implement @ControllerAdvice and @ExceptionHandler for clean error responses.' },
  { id: t(6,4,2), week: 6, day: 4, title: 'Build REST API: CRUD endpoints', description: 'Implement all CRUD endpoints for your Task Manager or Library system.' },
  { id: t(6,5,1), week: 6, day: 5, title: 'Write MockMvc integration tests', description: 'Test every endpoint using MockMvc and @WebMvcTest.' },
  { id: t(6,5,2), week: 6, day: 5, title: 'Write tests for error scenarios', description: 'Test validation errors, not-found cases, and bad requests.' },
  { id: t(6,6,1), week: 6, day: 6, title: 'Review and refactor API code', description: 'Apply Clean Code principles to your REST API. Ensure consistent naming and structure.' },

  // ============================================================
  // WEEK 7 — Databases: JPA, Hibernate & SQL
  // ============================================================
  { id: t(7,1,1), week: 7, day: 1, title: 'Learn JPA entities & annotations', description: 'Understand @Entity, @Table, @Id, @GeneratedValue, @Column.' },
  { id: t(7,1,2), week: 7, day: 1, title: 'Learn entity relationships', description: 'Practice @OneToMany, @ManyToOne, @ManyToMany, cascade types.' },
  { id: t(7,2,1), week: 7, day: 2, title: 'Learn Spring Data JPA: JpaRepository', description: 'Use JpaRepository for built-in CRUD and derived query methods.' },
  { id: t(7,2,2), week: 7, day: 2, title: 'Learn custom queries with @Query', description: 'Write JPQL and native SQL queries using @Query annotation.' },
  { id: t(7,3,1), week: 7, day: 3, title: 'SQL: JOINs and GROUP BY', description: 'Practice INNER JOIN, LEFT JOIN, RIGHT JOIN, and GROUP BY with aggregations.' },
  { id: t(7,3,2), week: 7, day: 3, title: 'SQL: Subqueries & indexing', description: 'Learn subqueries, correlated subqueries, and when/why to create indexes.' },
  { id: t(7,4,1), week: 7, day: 4, title: 'Set up H2 for testing', description: 'Configure H2 in-memory database for your test environment.' },
  { id: t(7,4,2), week: 7, day: 4, title: 'Set up PostgreSQL for production', description: 'Install PostgreSQL locally and connect your Spring Boot app to it.' },
  { id: t(7,5,1), week: 7, day: 5, title: 'Learn Flyway for migrations', description: 'Set up Flyway in your project and create your first migration script.' },
  { id: t(7,5,2), week: 7, day: 5, title: 'Write @DataJpaTest repository tests', description: 'Test your repository layer using @DataJpaTest with H2.' },
  { id: t(7,6,1), week: 7, day: 6, title: 'Integrate JPA into your REST API', description: 'Connect your Week 6 REST API to PostgreSQL with proper entity mappings.' },

  // ============================================================
  // WEEK 8 — Testing the Spring Stack
  // ============================================================
  { id: t(8,1,1), week: 8, day: 1, title: 'Learn @SpringBootTest', description: 'Write full integration tests that load the entire application context.' },
  { id: t(8,1,2), week: 8, day: 1, title: 'Understand test slices', description: 'Know when to use @WebMvcTest, @DataJpaTest, @JsonTest vs full context.' },
  { id: t(8,2,1), week: 8, day: 2, title: 'Learn Testcontainers', description: 'Spin up a real PostgreSQL container in your tests using Testcontainers.' },
  { id: t(8,2,2), week: 8, day: 2, title: 'Write Testcontainers integration tests', description: 'Rewrite your repository tests to use Testcontainers instead of H2.' },
  { id: t(8,3,1), week: 8, day: 3, title: 'Learn WireMock', description: 'Mock external HTTP services in integration tests using WireMock.' },
  { id: t(8,3,2), week: 8, day: 3, title: 'Write WireMock tests', description: 'Create integration tests that mock an external API call with WireMock.' },
  { id: t(8,4,1), week: 8, day: 4, title: 'Read Practical Test Pyramid', description: 'Read Martin Fowler\'s article on the Practical Test Pyramid — know it inside out.' },
  { id: t(8,4,2), week: 8, day: 4, title: 'Audit your test suite', description: 'Review your existing tests — are they at the right level of the pyramid?' },
  { id: t(8,5,1), week: 8, day: 5, title: 'Practice @WebMvcTest tests', description: 'Write focused controller tests with mocked service layer.' },
  { id: t(8,5,2), week: 8, day: 5, title: 'Practice @JsonTest tests', description: 'Test JSON serialization/deserialization with @JsonTest.' },
  { id: t(8,6,1), week: 8, day: 6, title: 'Review all test coverage', description: 'Run a coverage report and fill any gaps in your test suite.' },

  // ============================================================
  // WEEK 9 — Code Quality & Craft
  // ============================================================
  { id: t(9,1,1), week: 9, day: 1, title: 'Learn SOLID: SRP & OCP', description: 'Single Responsibility and Open/Closed principles with Java examples.' },
  { id: t(9,1,2), week: 9, day: 1, title: 'Learn SOLID: LSP, ISP & DIP', description: 'Liskov Substitution, Interface Segregation, Dependency Inversion.' },
  { id: t(9,2,1), week: 9, day: 2, title: 'Learn patterns: Strategy & Factory', description: 'Implement Strategy and Factory patterns in Java.' },
  { id: t(9,2,2), week: 9, day: 2, title: 'Learn patterns: Builder & Decorator', description: 'Implement Builder and Decorator patterns in Java.' },
  { id: t(9,3,1), week: 9, day: 3, title: 'Learn Observer pattern', description: 'Implement Observer/event listener pattern in Java.' },
  { id: t(9,3,2), week: 9, day: 3, title: 'Learn Hexagonal Architecture', description: 'Understand Ports & Adapters — domain core, inbound/outbound ports.' },
  { id: t(9,4,1), week: 9, day: 4, title: 'Set up SonarLint in IntelliJ', description: 'Install SonarLint plugin and run it on your projects.' },
  { id: t(9,4,2), week: 9, day: 4, title: 'Read Clean Architecture Ch. 1, 5–8', description: 'Read the selected chapters from Clean Architecture.' },
  { id: t(9,5,1), week: 9, day: 5, title: 'BOSS BATTLE: Full REST API (Part 1)', description: 'Build a CRUD + business rule API: Spring Boot, JPA, PostgreSQL, Flyway.', isBossBattle: true },
  { id: t(9,5,2), week: 9, day: 5, title: 'BOSS BATTLE: Full REST API (Part 2)', description: 'Add validation, error handling, 80%+ test coverage.', isBossBattle: true },
  { id: t(9,6,1), week: 9, day: 6, title: 'BOSS BATTLE: Full REST API (Part 3)', description: 'Write README with design decisions. Push to GitHub — portfolio piece #2.', isBossBattle: true },

  // ============================================================
  // WEEK 10 — Microservices Architecture
  // ============================================================
  { id: t(10,1,1), week: 10, day: 1, title: 'Learn microservices: Problems solved', description: 'Understand scalability, team autonomy, independent deployment.' },
  { id: t(10,1,2), week: 10, day: 1, title: 'Learn microservices: Problems created', description: 'Understand distributed complexity, data consistency, network failures.' },
  { id: t(10,2,1), week: 10, day: 2, title: 'Learn DDD: Bounded contexts', description: 'Understand bounded contexts and context mapping.' },
  { id: t(10,2,2), week: 10, day: 2, title: 'Learn DDD: Aggregates & ubiquitous language', description: 'Understand aggregates, aggregate roots, and shared team vocabulary.' },
  { id: t(10,3,1), week: 10, day: 3, title: 'Sync vs async communication', description: 'Compare synchronous REST calls vs asynchronous messaging between services.' },
  { id: t(10,3,2), week: 10, day: 3, title: 'Learn API Gateway pattern', description: 'Understand API Gateway as a single entry point for microservices.' },
  { id: t(10,4,1), week: 10, day: 4, title: 'Learn Circuit Breaker (Resilience4j)', description: 'Understand circuit breaker states (closed/open/half-open) and Resilience4j.' },
  { id: t(10,4,2), week: 10, day: 4, title: 'Read martinfowler.com/microservices', description: 'Read Martin Fowler\'s microservices resource page.' },
  { id: t(10,5,1), week: 10, day: 5, title: 'Draw a microservice architecture', description: 'Design a simple system with 2–3 services, an API gateway, and a message broker.' },
  { id: t(10,6,1), week: 10, day: 6, title: 'Review and reflect on Week 10', description: 'Review notes, re-read confusing sections, prepare for Docker week.' },

  // ============================================================
  // WEEK 11 — Docker
  // ============================================================
  { id: t(11,1,1), week: 11, day: 1, title: 'Learn containers conceptually', description: 'Understand what containers are, images vs containers, why they exist.' },
  { id: t(11,1,2), week: 11, day: 1, title: 'Install Docker Desktop', description: 'Install Docker Desktop and verify with docker --version.' },
  { id: t(11,2,1), week: 11, day: 2, title: 'Write a Dockerfile', description: 'Write a Dockerfile for your Spring Boot app using multi-stage build.' },
  { id: t(11,2,2), week: 11, day: 2, title: 'Learn docker build & docker run', description: 'Build an image and run a container from it. Understand ports and volumes.' },
  { id: t(11,3,1), week: 11, day: 3, title: 'Learn docker-compose', description: 'Understand docker-compose.yml syntax for multi-container setups.' },
  { id: t(11,3,2), week: 11, day: 3, title: 'Create docker-compose.yml', description: 'Set up docker-compose for your app + PostgreSQL together.' },
  { id: t(11,4,1), week: 11, day: 4, title: 'Watch Nana Docker crash course', description: 'Watch TechWorld with Nana\'s Docker crash course on YouTube.' },
  { id: t(11,4,2), week: 11, day: 4, title: 'Pluralsight: Docker for Developers', description: 'Start the Docker for Developers course on Pluralsight.' },
  { id: t(11,5,1), week: 11, day: 5, title: 'Practice container networking', description: 'Link containers, understand bridge networks, expose ports.' },
  { id: t(11,5,2), week: 11, day: 5, title: 'Practice volume mounts', description: 'Mount volumes for persistent data and local development.' },
  { id: t(11,6,1), week: 11, day: 6, title: 'Containerize your Phase 2 project', description: 'Add Docker support to your REST API project from Phase 2.' },

  // ============================================================
  // WEEK 12 — Messaging & Events
  // ============================================================
  { id: t(12,1,1), week: 12, day: 1, title: 'Learn why async messaging exists', description: 'Understand decoupling, resilience, and scalability benefits.' },
  { id: t(12,1,2), week: 12, day: 1, title: 'Compare Kafka vs RabbitMQ', description: 'Understand the differences: log-based vs traditional broker.' },
  { id: t(12,2,1), week: 12, day: 2, title: 'Set up RabbitMQ or Kafka via Docker', description: 'Run your chosen message broker locally using docker-compose.' },
  { id: t(12,2,2), week: 12, day: 2, title: 'Learn Spring AMQP or Spring Kafka', description: 'Understand the Spring integration for your chosen broker.' },
  { id: t(12,3,1), week: 12, day: 3, title: 'Build event publisher', description: 'Add an event publisher to your API: publish event when a task is completed.' },
  { id: t(12,3,2), week: 12, day: 3, title: 'Build event consumer', description: 'Create a consumer that listens for events and performs an action.' },
  { id: t(12,4,1), week: 12, day: 4, title: 'Test messaging integration', description: 'Write integration tests for your messaging setup.' },
  { id: t(12,5,1), week: 12, day: 5, title: 'Learn event-driven patterns', description: 'Understand event sourcing, CQRS, eventual consistency concepts.' },
  { id: t(12,6,1), week: 12, day: 6, title: 'Review messaging implementation', description: 'Clean up code, ensure tests pass, document the event flow.' },

  // ============================================================
  // WEEK 13 — CI/CD Pipelines
  // ============================================================
  { id: t(13,1,1), week: 13, day: 1, title: 'Learn GitHub Actions basics', description: 'Understand workflow files, triggers (on push/PR), jobs, and steps.' },
  { id: t(13,1,2), week: 13, day: 1, title: 'Create .github/workflows/ci.yml', description: 'Set up a CI pipeline that builds your project on every push.' },
  { id: t(13,2,1), week: 13, day: 2, title: 'Add test step to pipeline', description: 'Run all tests in your CI pipeline and fail the build if any test fails.' },
  { id: t(13,2,2), week: 13, day: 2, title: 'Add code coverage reporting', description: 'Generate and publish a code coverage report in your pipeline.' },
  { id: t(13,3,1), week: 13, day: 3, title: 'Learn deployment pipeline stages', description: 'Understand build → test → lint → deploy pipeline structure.' },
  { id: t(13,3,2), week: 13, day: 3, title: 'Learn "failing fast" concept', description: 'Why you want CI to catch issues before humans do.' },
  { id: t(13,4,1), week: 13, day: 4, title: 'Add linting to pipeline', description: 'Add a checkstyle or PMD step to your CI pipeline.' },
  { id: t(13,5,1), week: 13, day: 5, title: 'Optional: Deploy to Railway/Render/Fly.io', description: 'Deploy your app to a free-tier cloud hosting platform.' },
  { id: t(13,6,1), week: 13, day: 6, title: 'Review and finalize CI/CD setup', description: 'Ensure pipeline runs green. Document the pipeline in your README.' },

  // ============================================================
  // WEEK 14 — Cloud Fundamentals & System Design
  // ============================================================
  { id: t(14,1,1), week: 14, day: 1, title: 'Learn AWS: EC2 & S3', description: 'Conceptual understanding of compute instances and object storage.' },
  { id: t(14,1,2), week: 14, day: 1, title: 'Learn AWS: RDS & Lambda', description: 'Managed databases and serverless compute concepts.' },
  { id: t(14,2,1), week: 14, day: 2, title: 'Learn AWS: SQS and cloud messaging', description: 'Understand managed message queues in the cloud.' },
  { id: t(14,2,2), week: 14, day: 2, title: 'Learn cloud-native concepts', description: 'Statelessness, health checks, horizontal scaling, 12-factor app.' },
  { id: t(14,3,1), week: 14, day: 3, title: 'System Design: URL shortener', description: 'Design a URL shortener — draw components, discuss trade-offs, consider failures.' },
  { id: t(14,4,1), week: 14, day: 4, title: 'System Design: Notification service', description: 'Design a notification service — multi-channel, rate limiting, delivery guarantees.' },
  { id: t(14,5,1), week: 14, day: 5, title: 'System Design: E-commerce checkout', description: 'Design a checkout flow — inventory, payments, order processing, failure modes.' },
  { id: t(14,5,2), week: 14, day: 5, title: 'BOSS BATTLE: Add Docker + CI to Phase 2', description: 'Add Docker setup and GitHub Actions CI pipeline to your Phase 2 project.', isBossBattle: true },
  { id: t(14,6,1), week: 14, day: 6, title: 'BOSS BATTLE: Verify pipeline', description: 'Pipeline should run all tests, fail on failure, produce coverage report.', isBossBattle: true },

  // ============================================================
  // WEEKS 15–16 — Pair Programming
  // ============================================================
  { id: t(15,1,1), week: 15, day: 1, title: 'Find a study buddy', description: 'Search local meetups, Discord (Coding Blocks UK, Java UK) for a pairing partner.' },
  { id: t(15,2,1), week: 15, day: 2, title: 'Learn driver/navigator roles', description: 'Understand the roles: driver writes code, navigator reviews and guides.' },
  { id: t(15,3,1), week: 15, day: 3, title: 'Pair on FizzBuzz kata', description: 'Pair program on FizzBuzz — take turns driving and navigating.' },
  { id: t(15,4,1), week: 15, day: 4, title: 'Practice narrating your process', description: 'Code while talking through your thinking: "I\'m writing a failing test for..."' },
  { id: t(15,5,1), week: 15, day: 5, title: 'Pair on Roman Numerals kata', description: 'Pair program on Roman Numerals with role switching.' },
  { id: t(15,6,1), week: 15, day: 6, title: 'Practice receiving feedback', description: '"Oh, good point, let\'s refactor that" — practice graceful responses.' },

  { id: t(16,1,1), week: 16, day: 1, title: 'Sign up for cyber-dojo.org', description: 'Set up an account on cyber-dojo for structured pairing sessions.' },
  { id: t(16,2,1), week: 16, day: 2, title: 'Pair on String Calculator (cyber-dojo)', description: 'Use cyber-dojo for a timed kata pairing session.' },
  { id: t(16,3,1), week: 16, day: 3, title: 'Pair on Shopping Cart kata', description: 'Pair program on the Shopping Cart — the most EE-relevant kata.' },
  { id: t(16,4,1), week: 16, day: 4, title: 'Practice extended pairing (45 min)', description: 'Do a full 45-minute pairing session simulating EE interview length.' },
  { id: t(16,5,1), week: 16, day: 5, title: 'Pair on a new, unseen kata', description: 'Pick something from kata-log.rocks you haven\'t done — test your adaptability.' },
  { id: t(16,6,1), week: 16, day: 6, title: 'Reflect on pairing skills', description: 'Write down what went well and what to improve in your pairing sessions.' },

  // ============================================================
  // WEEKS 17–18 — Consultancy Mindset
  // ============================================================
  { id: t(17,1,1), week: 17, day: 1, title: 'Read EE blog and values', description: 'Read Equal Experts\' blog posts, values page, and Team Charter.' },
  { id: t(17,2,1), week: 17, day: 2, title: 'Read The Trusted Advisor Ch. 1–3', description: 'Read the first three chapters of The Trusted Advisor.' },
  { id: t(17,3,1), week: 17, day: 3, title: 'Practice: "Disagreed with technical decision"', description: 'Practice answering out loud: "Tell me about a time you disagreed with a technical decision."' },
  { id: t(17,4,1), week: 17, day: 4, title: 'Practice: "Walk through a system architecture"', description: 'Practice answering: "Walk me through a system you worked on end-to-end."' },
  { id: t(17,5,1), week: 17, day: 5, title: 'Practice: "Skip testing to ship faster"', description: 'Practice answering: "A client wants to skip testing. How do you handle that?"' },
  { id: t(17,6,1), week: 17, day: 6, title: 'Practice: "Joining codebase with tech debt"', description: 'Practice answering: "What\'s your approach when joining a codebase with tech debt?"' },

  { id: t(18,1,1), week: 18, day: 1, title: 'Think about scalability stories', description: 'Recall times you dealt with scalability and prepare to discuss them.' },
  { id: t(18,2,1), week: 18, day: 2, title: 'Think about error handling stories', description: 'Recall times you improved error handling and resilience.' },
  { id: t(18,3,1), week: 18, day: 3, title: 'Think about fault tolerance stories', description: 'Recall times you dealt with system failures and how you resolved them.' },
  { id: t(18,4,1), week: 18, day: 4, title: 'Learn STAR format', description: 'Structure your stories: Situation, Task, Action, Result.' },
  { id: t(18,5,1), week: 18, day: 5, title: 'Write 3 STAR stories', description: 'Write out 3 detailed STAR-format stories from your experience.' },
  { id: t(18,6,1), week: 18, day: 6, title: 'Practice all stories out loud', description: 'Rehearse all consultancy answers and STAR stories without notes.' },

  // ============================================================
  // WEEKS 19–20 — Architecture Deep Dives
  // ============================================================
  { id: t(19,1,1), week: 19, day: 1, title: 'Study load balancing', description: 'Understand round-robin, least connections, consistent hashing.' },
  { id: t(19,2,1), week: 19, day: 2, title: 'Study caching with Redis', description: 'Understand cache-aside, write-through, TTL, cache invalidation strategies.' },
  { id: t(19,3,1), week: 19, day: 3, title: 'Study DB sharding vs replication', description: 'Understand horizontal sharding, read replicas, trade-offs of each.' },
  { id: t(19,4,1), week: 19, day: 4, title: 'Study CAP theorem & eventual consistency', description: 'Understand the CAP theorem trade-offs in distributed systems.' },
  { id: t(19,5,1), week: 19, day: 5, title: 'Design a system (with observer)', description: 'Design a system on a whiteboard/screenshare while someone watches.' },
  { id: t(19,6,1), week: 19, day: 6, title: 'Design a second system (with observer)', description: 'Design another system — practice trade-off discussions and failure modes.' },

  { id: t(20,1,1), week: 20, day: 1, title: 'Read DDIA Ch. 1–2', description: 'Read Designing Data-Intensive Applications chapters 1–2.' },
  { id: t(20,2,1), week: 20, day: 2, title: 'Read DDIA Ch. 3–4', description: 'Read Designing Data-Intensive Applications chapters 3–4.' },
  { id: t(20,3,1), week: 20, day: 3, title: 'Read DDIA Ch. 8', description: 'Read the distributed systems problems chapter.' },
  { id: t(20,4,1), week: 20, day: 4, title: 'Design 2 more systems', description: 'Continue system design practice — 2 new designs this week.' },
  { id: t(20,5,1), week: 20, day: 5, title: 'Review Phase 2 project architecture', description: 'Prepare to discuss every architectural decision in your REST API project.' },
  { id: t(20,6,1), week: 20, day: 6, title: 'Review Phase 3 project architecture', description: 'Prepare to discuss every architectural decision in your Docker/CI project.' },

  // ============================================================
  // WEEKS 21–22 — Polish Your Portfolio
  // ============================================================
  { id: t(21,1,1), week: 21, day: 1, title: 'Write Project 1 README', description: 'TDD Shopping Cart: what it does, design decisions, how to run, how to test.' },
  { id: t(21,2,1), week: 21, day: 2, title: 'Write Project 2 README', description: 'REST API: what it does, design decisions, how to run, how to test.' },
  { id: t(21,3,1), week: 21, day: 3, title: 'Write "What I\'d improve" sections', description: 'Add "what I\'d improve with more time" to both READMEs.' },
  { id: t(21,4,1), week: 21, day: 4, title: 'Review all code for quality', description: 'Go through every file — clean naming, remove dead code, format consistently.' },
  { id: t(21,5,1), week: 21, day: 5, title: 'Optional: Polish Project 3', description: 'If you built an event-driven feature, polish and document it too.' },
  { id: t(21,6,1), week: 21, day: 6, title: 'Run all tests, verify CI green', description: 'Ensure everything passes and your CI pipeline is healthy.' },

  { id: t(22,1,1), week: 22, day: 1, title: 'Clean up GitHub profile', description: 'Update your bio, profile picture, and pin your best projects.' },
  { id: t(22,2,1), week: 22, day: 2, title: 'Pin projects on GitHub', description: 'Pin your TDD Shopping Cart and REST API projects.' },
  { id: t(22,3,1), week: 22, day: 3, title: 'Review project commit history', description: 'Ensure commit messages tell a clear story of your development process.' },
  { id: t(22,4,1), week: 22, day: 4, title: 'Get peer review', description: 'Ask a developer friend to review your projects and give feedback.' },
  { id: t(22,5,1), week: 22, day: 5, title: 'Address peer feedback', description: 'Implement any improvements suggested by your peer reviewer.' },
  { id: t(22,6,1), week: 22, day: 6, title: 'Final portfolio check', description: 'One last pass — everything looks professional and ready.' },

  // ============================================================
  // WEEK 23 — The Mock Interview
  // ============================================================
  { id: t(23,1,1), week: 23, day: 1, title: 'Arrange mock interview', description: 'Schedule a mock with a friend or via Pramp/interviewing.io.' },
  { id: t(23,2,1), week: 23, day: 2, title: 'Prepare take-home assignment', description: 'Do a timed Shopping Cart take-home (simulate EE format).' },
  { id: t(23,3,1), week: 23, day: 3, title: 'Mock: 45-min pair programming', description: 'Simulate EE pair programming session extending the take-home.' },
  { id: t(23,4,1), week: 23, day: 4, title: 'Mock: 45-min architecture deep dive', description: 'Simulate the deep dive on past projects — architecture, scalability, contributions.' },
  { id: t(23,5,1), week: 23, day: 5, title: 'Mock: Culture/consultancy conversation', description: 'Simulate the values and consultancy fit conversation.' },
  { id: t(23,6,1), week: 23, day: 6, title: 'Get feedback and iterate', description: 'Review all feedback from mock interview. Work on weak areas.' },

  // ============================================================
  // WEEK 24 — Application & Final Preparation
  // ============================================================
  { id: t(24,1,1), week: 24, day: 1, title: 'Apply to Equal Experts', description: 'Apply via EE website or LinkedIn.' },
  { id: t(24,2,1), week: 24, day: 2, title: 'Tailor your CV', description: 'Highlight: TDD, pair programming, Spring Boot, microservices, consulting.' },
  { id: t(24,3,1), week: 24, day: 3, title: 'Prepare 3–5 STAR stories', description: 'Finalize your best stories in STAR format.' },
  { id: t(24,4,1), week: 24, day: 4, title: 'Re-read EE Team Charter', description: 'Read the Equal Experts Team Charter and values one more time.' },
  { id: t(24,5,1), week: 24, day: 5, title: 'Final review of all notes', description: 'Skim through all your study notes — TDD, Spring, Docker, system design.' },
  { id: t(24,6,1), week: 24, day: 6, title: 'Rest and trust your preparation', description: 'Get good sleep. You\'ve put in the work. Trust it. 🚀' },
];

export const getTasksForWeek = (week: number): WeekTask[] =>
  tasks.filter((task) => task.week === week);

export const getTasksForDay = (week: number, day: number): WeekTask[] =>
  tasks.filter((task) => task.week === week && task.day === day);

export const getPhaseForWeek = (week: number): Phase | undefined =>
  phases.find((phase) => phase.weeks.includes(week));

export const getTotalTasks = (): number => tasks.length;
