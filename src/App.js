import './App.css';
import Header from './components/Header';
import StudyList from './components/StudyList';
import TodayList from './components/TodayList';
function App() {
  return (
    <div className="App">
      <Header leftText={'Leets Garden'} 
      middleText={'새싹 키우기'}
      nickName={'front'} />
      <StudyList/>
      <TodayList/>
    </div>
  );
}

export default App;
