import express from 'express';
import Product from './models/product.js';
import Supplier from './models/supplier.js';

const app = express();
const hostname = 'localhost';
const port = 3001;

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

// Product 
app.get('/', (req, res) => {
    Product.findAll().then((results) => {
        res.render('product/index', { products: results });
    });
})

app.get('/create', (req, res) => {
    res.render('product/create');
})

app.get('/edit/:id', (req, res) => {
    Product.findOne({ where: { id: req.params.id } }
    ).then((results) => {
        res.render('product/edit', { product: results });
    })
})

app.post('/api/product', (req, res) => {
    Product.create({ name: req.body.name, price: req.body.price }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

app.put('/api/product/:id', (req, res) => {
    Product.update({ name: req.body.name, price: req.body.price }, { where: { id: req.params.id } }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

app.delete('/api/product/:id', (req, res) => {
    Product.destroy({ where: { id: req.params.id } }
    ).then(() => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 500, error: err, Response: {} });
    })
})

// Supplier
app.get('/suppliers', (req, res) => {
    Supplier.findAll().then((results) => {
        res.render('supplier/index', { suppliers: results });
    });
})

app.get('/create-supplier', (req, res) => {
    res.render('supplier/create');
})

app.get('/edit-supplier/:id', (req, res) => {
    Supplier.findOne({ where: { id: req.params.id } }
    ).then((results) => {
        res.render('supplier/edit', { supplier: results });
    })
})

app.post('/api/suppliers', (req, res) => {
    Supplier.create({ company_name: req.body.company_name, contact_name: req.body.contact_name, email: req.body.email, phone: req.body.phone, active: 1 }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

app.put('/api/supplier/:id', (req, res) => {
    Supplier.update({ company_name: req.body.company_name, contact_name: req.body.contact_name, email: req.body.email, phone: req.body.phone, active: 1 }, { where: { id: req.params.id } }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

app.delete('/api/supplier/:id', (req, res) => {
    Supplier.destroy({ where: { id: req.params.id } }
    ).then(() => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 500, error: err, Response: {} });
    })
})

app.listen(port, () => {
    console.log(`Server running at ${hostname}:${port}`);
})