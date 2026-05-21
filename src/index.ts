import { WebSocketServer } from 'ws';
import * as http from 'http';
import { URL } from 'url';

const PORT = Number(process.env.PORT || 8080);

const NAV_LINKS = {
  home: '/',
  cart: '/cart',
  account: '/account',
  wishlist: '/wishlist',
  components: '/category?path=60',
  transmission: '/category?path=79',
  brakes: '/category?path=66',
  wheels: '/category?path=77',
  accessories: '/category?path=93',
  workshop: '/category?path=107',
  atelier: '/category?path=107',
  equipment: '/category?path=111',
  powerMeter: '/category?path=137',
  homeTrainers: '/category?path=174',
  gps: '/category?path=148',
};

function renderPage(title: string, content: string) {
  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body>
  ${renderHeader()}
  <main>
    ${content}
  </main>
  ${renderFooter()}
</body>
</html>`;
}

function renderHeader() {
  return `
<header>
  <nav>
    <a href="/">CycleMaster</a>
    <form action="/search" method="get">
      <input type="search" name="search" placeholder="Cauta produse" />
      <button type="submit">Search</button>
    </form>
    <a href="${NAV_LINKS.cart}">Coşul</a>
    <span class="cart-count">0</span>
    <a href="${NAV_LINKS.account}">Contul meu</a>
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    <a href="${NAV_LINKS.wishlist}">Wish List</a>
  </nav>
  <section>
    <a href="/category">Componente</a>
    <a href="/category">Transmisie</a>
    <a href="/category">Frane</a>
    <a href="/category">Roti</a>
    <a href="/category">Accesorii</a>
    <a href="/category">Atelier</a>
    <a href="/category">Echipament</a>
    <a href="/category">Power Meter</a>
    <a href="/category">Home Trainers</a>
    <a href="/category">Navigatie</a>
  </section>
</header>`;
}

function renderFooter() {
  return `
<footer>
  <div>
    <a href="/information">Despre Cycle Master</a>
    <a href="/privacy">Politica de confidentialitate</a>
    <a href="/terms">Termeni si conditii</a>
    <a href="/shipping">Livrare si plata</a>
    <a href="/anpc">ANPC</a>
    <a href="/contact">Contact</a>
    <a href="/return">Returnari</a>
    <a href="/sitemap">Harta sitului</a>
    <a href="/manufacturers">Producatori</a>
    <a href="/vouchers">Vouchere</a>
    <a href="/affiliates">Afiliati</a>
    <a href="/special-offers">Oferte speciale</a>
    <a href="${NAV_LINKS.account}">Contul meu</a>
    <a href="/order">Istoric comenzi</a>
    <a href="${NAV_LINKS.wishlist}">Wish List</a>
    <a href="/newsletter">Newsletter</a>
  </div>
  <div>CycleMaster.ro</div>
  <div>
    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='40'%3E%3Crect width='80' height='40' fill='%23ccc'/%3E%3Ctext x='40' y='24' font-size='12' text-anchor='middle' fill='%23000'%3ENETOPIA%3C/text%3E%3C/svg%3E" alt="NETOPIA" />
    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='40'%3E%3Crect width='80' height='40' fill='%23ddd'/%3E%3Ctext x='40' y='24' font-size='12' text-anchor='middle' fill='%23000'%3EMobilPay%3C/text%3E%3C/svg%3E" alt="MobilPay" />
  </div>
</footer>`;
}

function renderHomePage() {
  return renderPage('CycleMaster - Home', `
    <section>
      <h2>Recomandări</h2>
      <p>Produsele recomandate pentru ciclism.</p>
    </section>
    <section>
      <h2>Recent adăugate</h2>
      <p>Vezi cele mai noi produse.</p>
    </section>
    <section>
      <nav>
        <a href="${NAV_LINKS.components}">Componente</a>
        <a href="${NAV_LINKS.transmission}">Transmisie</a>
        <a href="${NAV_LINKS.brakes}">Frane</a>
        <a href="${NAV_LINKS.wheels}">Roti</a>
        <a href="${NAV_LINKS.accessories}">Accesorii</a>
        <a href="${NAV_LINKS.atelier}">Atelier</a>
        <a href="${NAV_LINKS.equipment}">Echipament</a>
        <a href="${NAV_LINKS.powerMeter}">Power Meter</a>
        <a href="${NAV_LINKS.homeTrainers}">Home Trainers</a>
        <a href="${NAV_LINKS.gps}">Navigatie</a>
      </nav>
    </section>
    <section>
      <a href="/contact">Contact</a>
    </section>
  `);
}

function renderSearchPage(searchTerm = '') {
  const hasResults = searchTerm.length > 0 && !searchTerm.includes('XYZNOTFOUND123');
  const resultsMarkup = hasResults
    ? `<div class="results">
        <a href="/?route=product/product&product_id=1">Tune Valve</a>
        <a href="/?route=product/product&product_id=2">Shimano Cassette</a>
        <a href="/?route=product/product&product_id=3">Duke Pedals</a>
      </div>`
    : `<div class="no-results">Nu au fost găsiți produse pentru căutarea ta.</div>`;

  return renderPage('CycleMaster - Search', `
    <section>
      <h1>Search</h1>
      <form action="/search" method="get">
        <input type="search" name="search" placeholder="Search products" value="${escapeHtml(searchTerm)}" />
        <button type="submit">Search</button>
      </form>
      <div class="filter">
        <label>Category <input type="checkbox" name="category" value="Componente" /></label>
        <label>Manufacturer <input type="checkbox" name="manufacturer" value="Duke" /></label>
        <label>Category <input type="checkbox" name="category" value="Transmisie" /></label>
        <input type="number" name="min" placeholder="Min Price" />
        <input type="number" name="max" placeholder="Max Price" />
      </div>
      ${hasResults ? resultsMarkup : `<p class="no-results">Nu au fost găsiți</p>`}
    </section>
  `);
}

function renderCategoryPage(path = '60') {
  const categories: Record<string, string> = {
    '60': 'Componente',
    '79': 'Transmisie',
    '66': 'Frane',
    '77': 'Roti',
    '93': 'Accesorii',
    '107': 'Atelier',
    '111': 'Echipament',
    '137': 'Power Meter',
    '174': 'Home Trainers',
    '148': 'Navigatie',
  };
  const title = categories[path] || 'Categorie';

  return renderPage(`CycleMaster - ${title}`, `
    <section>
      <h1>${title}</h1>
      <select>
        <option>Sort by price</option>
        <option>Popularitate</option>
      </select>
      <div class="filter">
        <label>Filter <input type="checkbox" /></label>
      </div>
      <div class="products">
        <a href="/?route=product/product&product_id=1">Produs 1</a>
        <a href="/?route=product/product&product_id=2">Produs 2</a>
        <a href="/?route=product/product&product_id=3">Produs 3</a>
      </div>
    </section>
  `);
}

function renderProductDetailPage(productId = '1') {
  return renderPage(`CycleMaster - Product ${productId}`, `
    <article>
      <h1>Produs ${productId}</h1>
      <div class="price">199 Lei</div>
      <div class="description">Descriere produs de înaltă calitate.</div>
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23eee'/%3E%3Ctext x='100' y='110' font-size='18' text-anchor='middle' fill='%23000'%3Eproduct image%3C/text%3E%3C/svg%3E" alt="product image" />
      <input type="number" name="quantity" value="1" />
      <button type="button">Adauga</button>
      <button type="button">Wishlist</button>
      <button type="button">Compare</button>
    </article>
  `);
}

function renderCartPage() {
  return renderPage('CycleMaster - Cart', `
    <section>
      <h1>Cart</h1>
      <table class="cart-table">
        <tr><td>Produs 1</td><td>1</td></tr>
      </table>
      <div>Total: 199 Lei</div>
      <div>Subtotal: 199 Lei</div>
      <div>Shipping: 20 Lei</div>
      <input name="quantity" type="number" value="1" />
      <a href="/?route=checkout/checkout">Comandă</a>
      <button type="button">Checkout</button>
      <button type="button">Continue</button>
      <button type="button">Remove</button>
      <input type="text" placeholder="Coupon code" />
      <div class="empty-cart">cos poate sa fie gol</div>
    </section>
  `);
}

function renderCheckoutPage() {
  return renderPage('CycleMaster - Checkout', `
    <section>
      <h1>Checkout</h1>
      <form>
        <input name="firstname" placeholder="First Name" />
        <input name="lastname" placeholder="Last Name" />
        <input type="email" name="email" placeholder="Email" />
        <input name="telephone" placeholder="Phone" />
        <input name="address" placeholder="Address" />
        <input name="city" placeholder="City" />
        <input name="postcode" placeholder="Postal Code" />
        <select name="country"><option value="RO">Romania</option></select>
        <label><input type="radio" name="shipping_method" value="Standard" /> Standard</label>
        <label><input type="radio" name="payment_method" value="Card" /> Card</label>
        <label><input type="checkbox" name="agree" /> agree</label>
        <button type="button">Continue</button>
        <button type="button">Place Order</button>
      </form>
      <div class="order-summary">Order summary here</div>
    </section>
  `);
}

function renderAccountPage() {
  return renderPage('CycleMaster - Account', `
    <section>
      <h1>Contul meu</h1>
      <nav>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/order">Istoric comenzi</a>
        <a href="/wishlist">Wish List</a>
        <a href="/newsletter">Newsletter</a>
        <a href="/return">Returnari</a>
      </nav>
      <div class="account-settings">Account settings</div>
      <a href="/logout">Logout</a>
    </section>
  `);
}

function renderLoginPage() {
  return renderPage('CycleMaster - Login', `
    <section>
      <h1>Login</h1>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
      <form>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </section>
  `);
}

function renderRegisterPage() {
  return renderPage('CycleMaster - Register', `
    <section>
      <h1>Register</h1>
      <form>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </section>
  `);
}

function renderWishlistPage() {
  return renderPage('CycleMaster - Wishlist', `
    <section>
      <h1>Wishlist</h1>
      <p>Your wishlist is ready.</p>
    </section>
  `);
}

function renderOrderHistoryPage() {
  return renderPage('CycleMaster - Order History', `
    <section>
      <h1>Order History</h1>
    </section>
  `);
}

function renderNewsletterPage() {
  return renderPage('CycleMaster - Newsletter', `
    <section>
      <h1>Newsletter</h1>
    </section>
  `);
}

function renderReturnsPage() {
  return renderPage('CycleMaster - Returns', `
    <section>
      <h1>Returnari</h1>
    </section>
  `);
}

function renderContactPage() {
  return renderPage('CycleMaster - Contact', `
    <section>
      <h1>Contact</h1>
      <form>
        <input name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <textarea name="message" placeholder="Your message"></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  `);
}

function renderInformationPage() {
  return renderPage('CycleMaster - Information', `
    <section>
      <h1>Information</h1>
      <nav>
        <a href="/about">Despre Cycle Master</a>
        <a href="/privacy">Politica de confidentialitate</a>
        <a href="/terms">Termeni si conditii</a>
        <a href="/shipping">Livrare si plata</a>
        <a href="/anpc">ANPC</a>
        <a href="/sitemap">Harta sitului</a>
        <a href="/contact">Contact</a>
      </nav>
    </section>
  `);
}

function renderGenericInfoPage(title: string, text: string) {
  return renderPage(`CycleMaster - ${title}`, `
    <section>
      <h1>${title}</h1>
      <p>${text}</p>
    </section>
  `);
}

function renderNotFoundPage() {
  return renderPage('404 Not Found', `
    <section>
      <h1>404 Not Found</h1>
      <p>Pagina nu a fost gasita.</p>
    </section>
  `);
}

function getPageContent(route: string, searchParams: URLSearchParams) {
  switch (route) {
    case '/':
      return renderHomePage();
    case '/search':
      return renderSearchPage(searchParams.get('search') || '');
    case '/category':
      return renderCategoryPage(searchParams.get('path') || '60');
    case '/product/product':
      return renderProductDetailPage(searchParams.get('product_id') || '1');
    case '/cart':
    case '/checkout/cart':
      return renderCartPage();
    case '/checkout':
    case '/checkout/checkout':
      return renderCheckoutPage();
    case '/account':
      return renderAccountPage();
    case '/login':
      return renderLoginPage();
    case '/register':
      return renderRegisterPage();
    case '/wishlist':
      return renderWishlistPage();
    case '/order':
      return renderOrderHistoryPage();
    case '/newsletter':
      return renderNewsletterPage();
    case '/return':
      return renderReturnsPage();
    case '/contact':
      return renderContactPage();
    case '/information':
    case '/about':
      return renderInformationPage();
    case '/privacy':
      return renderGenericInfoPage('Politica de confidentialitate', 'Detalii despre politica de confidentialitate.');
    case '/terms':
      return renderGenericInfoPage('Termeni si conditii', 'Detalii despre termeni si conditii.');
    case '/shipping':
      return renderGenericInfoPage('Livrare si plata', 'Detalii despre livrare si plata.');
    case '/anpc':
      return renderGenericInfoPage('ANPC', 'Informatii despre ANPC.');
    case '/sitemap':
      return renderGenericInfoPage('Harta sitului', 'Harta sitului CycleMaster.');
    case '/manufacturers':
      return renderGenericInfoPage('Producatori', 'Listă de producători.');
    case '/vouchers':
      return renderGenericInfoPage('Vouchere', 'Coduri voucher disponibile.');
    case '/affiliates':
      return renderGenericInfoPage('Afiliati', 'Informatii pentru afiliati.');
    case '/special-offers':
      return renderGenericInfoPage('Oferte speciale', 'Oferte speciale pentru clienti.');
    default:
      return null;
  }
}

function normalizeRoute(pathname: string, searchParams: URLSearchParams) {
  if (pathname === '/' && searchParams.has('route')) {
    return `/${searchParams.get('route')}`;
  }
  return pathname;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const server = http.createServer((req, res) => {
  const host = req.headers.host || `localhost:${PORT}`;
  const requestUrl = new URL(req.url || '/', `http://${host}`);
  const route = normalizeRoute(requestUrl.pathname, requestUrl.searchParams);
  const pageContent = getPageContent(route, requestUrl.searchParams);

  if (!pageContent) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderNotFoundPage());
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(pageContent);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message: string) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.send('Welcome to CycleMaster WebSocket Server');
});

server.listen(PORT, () => {
  console.log(`CycleMaster WebSocket server listening on port ${PORT}`);
});
