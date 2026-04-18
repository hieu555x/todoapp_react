# 📋 Interview Guide - TodoApp Project

## 3 Scenarios & Trả lời

---

## 1️⃣ Scenario: Bạn chưa học React Native sâu

### Cách Frame Project Honest

**KHÔNG nên:**

- ❌ "Tôi xây dựng project này từ A-Z"
- ❌ "Tôi là expert React Native"
- ❌ "Tôi tự viết toàn bộ code"

**NÊN:**

- ✅ "Tôi làm project này với sự hướng dẫn của AI assistant, để học architecture patterns và backend integration"
- ✅ "Project này giúp tôi hiểu cách làm clean architecture, authentication, và database design"
- ✅ "Tôi đang trong quá trình học React Native, project này là milestone đầu tiên"

### Trả lời: "Bạn có kinh nghiệm React Native không?"

```
"Tôi chưa có kinh nghiệm sâu với React Native, nhưng tôi vừa hoàn thành
project todo app với Expo để học. Trong quá trình làm, tôi đã học được:

✅ React Native fundamentals (components, hooks, navigation)
✅ Backend integration với Supabase
✅ State management với custom hooks
✅ Clean architecture patterns
✅ Authentication & session management
✅ Async operations

Những kiến thức về React core concepts (hooks, components, state)
vẫn áp dụng được, chỉ khác syntax một chút.

Nếu bạn dùng React Native, tôi sẵn sàng dive deep và ramp up nhanh
vì fundamentals tôi đã hiểu rồi."
```

### Trả lời: "Clean Architecture cho todo app - thực sự cần thiết không?"

```
"Đó là decision tôi cố ý đưa ra để học. Thật sự, for 1 simple todo app,
nó có thể overkill, nhưng:

Tôi quyết định làm vì:
1. Muốn hiểu patterns mà scaling projects dùng
2. Practice separation of concerns
3. Make code testable & maintainable

Tradeoff:
✅ Pro: Easy to scale, testable, maintainable
❌ Con: More files, more boilerplate, learning curve

Nếu bạn đang develop production app, bạn thường dùng pattern gì?
Tôi muốn biết best practices của team."
```

### Trả lời: "Nếu chúng tôi pick you, bạn có thể ramp up nhanh không?"

```
"Có, vì lý do:

1. Tôi đã có React fundamentals (từ web/project này)
   → Transition to React Native không khó

2. Tôi học được architecture & design patterns
   → Có thể apply bất kỳ tech nào

3. Tôi proof myself rằng tôi tự học (self-motivated)
   → Không cần hand-hold, tôi sẽ explore & learn

4. Tôi biết cách hỏi & debug
   → Nếu stuck, tôi hỏi team (không mất thời gian)

Timeline ramp up:
- Week 1: Familiar với codebase, coding patterns của team
- Week 2-3: Contribute small features, learn team conventions
- Month 2: Independent contributor

Tôi commit học hỏi & perform nhanh."
```

### CV Format (khi chưa deep dive)

```
TodoApp - React Native Todo Application (Learning Project)
• Built cross-platform todo app using Expo & React Native
• Integrated Supabase backend with PostgreSQL & Row-Level Security
• Implemented Clean Architecture to practice scalable code patterns
• Features: User authentication, real-time CRUD, dark mode, responsive UI
• Tech Stack: TypeScript, React Native, Supabase, AsyncStorage
• Currently learning React Native; this project showcases architecture
  understanding and ability to integrate frontend with backend services
```

---

## 2️⃣ Scenario: Bạn có Flutter background

### Advantage of Flutter Experience

**Skills transfer 100%:**

- ✅ Mobile architecture thinking
- ✅ State management patterns
- ✅ Responsive UI design
- ✅ Backend integration
- ✅ Performance optimization
- ✅ Testing mindset

**Syntax adjustment:**

- ❌ Dart → JavaScript/TypeScript
- ❌ Widget tree → Component tree (mental model same)
- ❌ Provider/Riverpod → Hooks (learning curve minimal)

### Trả lời: "Tại sao bạn switch từ Flutter sang React Native?"

```
"Tôi quyết định học React Native vì:

1️⃣ Mở rộng skill set:
   - Flutter = Dart ecosystem
   - React Native = JavaScript/TypeScript ecosystem
   - Web/mobile unified (React principles apply for both)

2️⃣ Market opportunity:
   - Việt Nam React ecosystem lớn hơn Flutter (hiện tại)
   - More job opportunities với React Native
   - Web development tương tự React, dễ transition

3️⃣ Technical comparison:
   - Flutter: Hot reload, Material Design built-in ✅
   - React Native: JS ecosystem, web bridge, Expo easy setup ✅

4️⃣ Learnings từ project này:
   - Hooks patterns (different from Flutter's Provider/Riverpod)
   - Async management khác cách Flutter
   - Navigation paradigm khác (React Navigation vs Navigator 2.0)

Tôi muốn lưu loát cả 2 framework, tùy project cần gì."
```

### Trả lời: "So sánh state management: Riverpod vs Custom Hooks?"

```
"Good question! Đó là core difference:

Flutter (Riverpod):
✅ Functional reactive approach
✅ Easy dependency override for testing
✅ Automatic cleanup
✅ Strong typing with Dart

React Native (Custom Hooks):
✅ Simpler, less abstraction
✅ React docs/ecosystem support
✅ Gradual complexity
❌ Need to manually handle cleanup

Comparison:

Riverpod (Flutter)          │ Hooks (React Native)
─────────────────────────────────────────────────
Provider<T>                 │ useState<T>
StateNotifier + async       │ useAsync (custom)
.select() for perf          │ useMemo for perf
override for test           │ React Testing Lib

Trong project tôi làm:
- Implement useAuthViewModel & useTodoViewModel (similar to Riverpod providers)
- Manual cleanup với useEffect deps array
- Async handling với try-catch

Nếu project scale, recommend:
- Zustand hoặc Jotai (Riverpod equivalent)
- React Context + useContext

Tôi khá familiar with both approaches."
```

### Trả lời: "So sánh Styling: Flutter ThemeData vs React Native StyleSheet?"

```
Flutter (ThemeData):
✅ Centralized, change theme globally instantly
✅ copyWith() makes easy modifications
✅ Material Design built-in
✅ Hot reload updates UI immediately

React Native (StyleSheet):
✅ Native performance optimization
✅ Custom flexibility
❌ Duplication if many components
❌ Manual dark mode toggle

Trong project:
- Implement Material You theme (like Flutter Material 3)
- Centralize colors trong getMaterialScheme()
- Manual dark mode toggle

Nếu scale, recommend:
- React Native Paper (like Flutter Material package)
- Tamagui (more like Flutter flexibility)

Transfer skill: Theme management concept giống, chỉ syntax khác."
```

### Trả lời: "Performance - FlatList vs ListView?"

```
Cơ bản similar, nhưng khác cách implement:

Flutter ListView.builder:
- Lazy loading: ✅
- Item caching: ✅
- Custom separators: simple

React Native FlatList:
- Lazy loading: ✅
- Item caching: ✅
- Performance tuning: manual

Key difference:
- Flutter: 'Just works' optimization by default
- React Native: Need explicit optimization

Optimizations (từ Flutter transfer):
1. KeyExtractor = Key trong Flutter (prevent re-render)
2. renderItem = itemBuilder callback
3. Item separator = Divider widget
4. maxToRenderPerBatch = tuning (React Native specific)

Best practice từ Flutter:
- Memoize list items (useMemo)
- Don't do heavy operations in renderItem
- Profile with DevTools

Tôi comfortable optimize cả 2 frameworks."
```

### Opening Statement - Flutter Background

```
"Tôi có Flutter background (X years). Project này là stepping stone
để expand vào React Native ecosystem vì:
- Muốn lưu loát multi-framework
- Job market opportunity React Native lớn
- Want to leverage web/mobile unified (React)

Tôi đã transfer skills nhanh chóng:
- Architecture thinking: Direct transfer
- State management: Similar paradigms, syntax khác
- Performance: Same optimization principles

Tôi ready để deep dive React Native production code."
```

### CV Format - Flutter Background

```markdown
## Mobile Development Experience

### Flutter (1-2 years)

- Built cross-platform apps with Flutter & Dart
- State management: Provider, Riverpod
- Backend integration: Firebase, REST APIs
- Features: Authentication, real-time data, offline-first

### React Native (Current Learning - TodoApp Project)

- Expo-based development
- State management: React Hooks, custom hooks
- Backend: Supabase PostgreSQL
- Clean Architecture implementation

### Core Mobile Skills (transferable)

✓ Cross-platform development mindset
✓ Architecture patterns (MVVM, Clean Architecture)
✓ Performance optimization
✓ Authentication & security
✓ Database integration
```

---

## 📊 Key Takeaways

### Honest is Best Policy

- Don't fake experience
- Show willingness to learn
- Demonstrate transfer of fundamentals
- Prove you can ramp up fast

### Frame your story

- Focus on architecture & patterns, not syntax
- Show problem-solving skills
- Demonstrate learning ability
- Be proactive about what you don't know

### Flutter → React Native

- Huge advantage over beginner
- Transfer skills apply immediately
- Ramp up 2x faster than web devs
- Show multi-framework capability

---

## 🚀 Good luck với phỏng vấn!

**Remember:**

- Be authentic
- Show enthusiasm for learning
- Demonstrate fundamentals understanding
- Focus on what you CAN do
