import './App.css';
import Header from './components/Header';
import DayStudyList from './components/DayStudyList';
import StudyList from './components/StudyList';
function App() {
  return (
    <div className="App">
      <Header leftText={'Leets Garden'} 
      middleText={'새싹 키우기'}
      nickName={'front'} />
      <StudyList/>
      <DayStudyList/>
    </div>
  );
}

export default App;
