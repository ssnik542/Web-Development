import { useEffect, useState } from 'react';
import './App.css';
import Fact from './Component/Fact';
import Form from './Component/Form';
import Header from './Component/Header';
import Loader from './Component/Loader';
import Sidebar from './Component/Sidebar';
import supabase from './supabase'
function App() {
  // const rating = stars => '⭐⭐⭐⭐⭐☆☆☆☆☆'.slice(5 - stars, 10 - stars)
  // console.log(rating(2))
  const [filter, setFilter] = useState('ALL');
  const [share, setShare] = useState(false);
  const [facts, setFacts] = useState([])
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    async function getFacts() {
      setisLoading(true)
      let query = supabase.from('facts').select('*');
      if (filter !== 'ALL') {
        query = query.eq('type', filter.toLocaleLowerCase())
      }
      let { data: fact, error } = await query
        .order("like", { ascending: false })
        .limit(1000);
      if (!error) setFacts(fact)
      else alert('There was problem geeting data')
      setisLoading(false)
    }
    getFacts();
  }, [filter])
  return (
    <div className="App">
      <Header setShare={setShare} share={share} />
      {share && <Form setShare={setShare} setFacts={setFacts} />}
      <div className="container">
        <Sidebar setFilter={setFilter} />
        {isLoading ? <Loader /> : <Fact filter={filter} facts={facts} setFacts={setFacts} />}
      </div>
    </div>
  );
}

export default App;
