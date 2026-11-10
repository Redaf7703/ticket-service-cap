import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AIChat from "./components/AIChat";

function App() {
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>My Dashboard</h2>

        <nav>
          <a className="active">Dashboard</a>
          <a>Users</a>
          <a>Orders</a>
          <a>Products</a>
          <a>Reports</a>
          <a>Settings</a>
        </nav>
      </aside>

      <main className="main-content">

        <header className="topbar">
          <h1>Dashboard</h1>
          <div className="profile">
            Welcome, Rida 👋
          </div>
        </header>

        <section className="cards">

          <div className="card">
            <h3>Total Users</h3>
            <p>1,245</p>
            <span>+12% this month</span>
          </div>

          <div className="card">
            <h3>Total Orders</h3>
            <p>856</p>
            <span>+8% this month</span>
          </div>

          <div className="card">
            <h3>Total Revenue</h3>
            <p>₹85,420</p>
            <span>+15% this month</span>
          </div>

          <div className="card">
            <h3>Products</h3>
            <p>320</p>
            <span>+5 new products</span>
          </div>

        </section>

        <section className="content-box">
          <h2>Recent Orders</h2>

          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#1001</td>
                <td>Rahul</td>
                <td>Laptop</td>
                <td>₹55,000</td>
                <td className="success">Completed</td>
              </tr>

              <tr>
                <td>#1002</td>
                <td>Priya</td>
                <td>Mobile</td>
                <td>₹25,000</td>
                <td className="pending">Pending</td>
              </tr>

              <tr>
                <td>#1003</td>
                <td>Aman</td>
                <td>Headphones</td>
                <td>₹3,500</td>
                <td className="success">Completed</td>
              </tr>
            </tbody>
          </table>
        </section>
       
      </main>
      <AIChat />
    </div>
  );
}


export default App
