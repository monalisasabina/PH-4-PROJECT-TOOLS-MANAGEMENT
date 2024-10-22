import NavBar from "../components/NavBar";


function Home(){

    return(
        <>
        <header>
          <div className = "logo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="#808"><path d="M0 240v240h240A240 240 0 0 0 0 240ZM240 480h240V240a240 240 0 0 0-240 240ZM240 0H0v240A240 240 0 0 0 240 0ZM240 0a240 240 0 0 0 240 240V0H240Z"></path></svg>STORES</div>
              <NavBar /> 
          <button className="contact-us">Contact Us</button>
          </header>
          <h1>Elevate Your  Business</h1>
            <h1>Using Our Management System</h1>
          <p id="home">Store management system simplifies the day to day activities of your store for better management </p>

          <section className="solutions">
        <h2>Our Solutions</h2>
        <div className="solution-cards">
          <div className="solution-card">
            <h3>Inventory Management</h3>
            <p>Manage your stock levels, track inventory movements, and optimize your supply chain.</p>
          </div>
          <div className="solution-card">
            <h3>Point of Sale (POS) System</h3>
            <p>Streamline your sales process, manage transactions, and track customer data.</p>
          </div>
          <div className="solution-card">
            <h3>Customer Relationship Management (CRM)</h3>
            <p>Build strong relationships with your customers, track interactions, and personalize their experience.</p>
          </div>
          <div className="solution-card">
            <h3>Reporting and Analytics</h3>
            <p>Gain insights into your business performance, track key metrics, and make data-driven decisions.</p>
          </div>
        </div>
      </section>

        <footer>
         <p>&copy; 2023 STORES. All rights reserved.</p>
      </footer>

        
        </>
    )
}

export default Home