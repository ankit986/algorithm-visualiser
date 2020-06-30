import React from 'react';
import './App.css';
import Searching from './components/Searching'
import Sorting from './components/Sorting'
import NavBar from './components/NavBar';
import { connect } from 'react-redux'
import handleInitialData from './actions/shared';
import { isRunning } from './actions/running';
import currentAlgorithm from './reducers/currentAlgorithm';
import { setCurrentAlgorithm } from './actions/algorithm';

class App extends React.Component {
  state = {
    currentSearchingAlgorithmName: '',
    currentSortingAlgorithmName: ''
  }
  componentDidMount() {
    console.log('props ', this.props)
    this.props.dispatch(isRunning(false))
    this.props.dispatch(setCurrentAlgorithm(''))
    console.log('props ', this.props)

  }
  render() {
    // const currentAlgorithm = this.props.currentAlgorithm
    console.log('app above ', this.props.currentAlgorithm)
    const { currentSearchingAlgorithmName, currentSortingAlgorithmName } = this.state
    return (
      <div className="App">
        <NavBar />
        {/* <Searching currentSearchingAlgorithmName={currentSearchingAlgorithmName} /> */}

        <Sorting />
      </div>
    );
  }
}
// export default App;
function mapStateToProps({ isrunning, currentAlgorithm }) {

  console.log('app mstp state ', isrunning,currentAlgorithm)

  return {
    isrunning, 
    currentAlgorithm,
    loading: false
  }
}

export default connect(mapStateToProps)(App)