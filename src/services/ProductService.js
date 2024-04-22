const Product = require('../models/ProductModel')
const createProduct = (newProduct) => {
    console.log('newProduct outside', newProduct);
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countIntock, rating, description, discount } = newProduct
        try {

            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                console.log('sai service');
                resolve({
                    status: 'ERR',
                    message: "The name of product already in database"
                })
            }
            const newProduct = await Product.create({
                name, image, type, price, rating, discount: Number(discount), description,
                countIntock: Number(countIntock)
            })
            console.log('newProduct createProduct control', newProduct);
            resolve({
                status: 'OK',
                message: "Create Product in database success",
                data: newProduct
            })
        } catch (error) {
            reject(error)
        }
    })
}
const updateProduct = (id, data) => {
    console.log('updateProduct outside', data);
    return new Promise(async (resolve, reject) => {
        try {

            // if(!data.name || ){
            //     console.log('updateProduct wrong');
            // }
            // console.log('updateProduct right');
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: "The product not found in database"
                })
            }
            const updateProduct = await Product.findByIdAndUpdate({ _id: id }, data, { new: true })
            console.log('updateProduct SERVCE', updateProduct);
            resolve({
                status: 'OK',
                message: `Update Product ${updateProduct.name} Success`,
                data: updateProduct
            })
        } catch (err) {
            reject(err)
        }
    })
}

// get details product by ID
const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkId = await Product.findOne({
                _id: id
            })

            // console.log('checkId result',checkId);
            if (checkId === null) {
                resolve({
                    status: 'ERR',
                    message: 'Not found in Database'
                })
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: checkId
            })
        } catch (e) {
            reject(e)
        }
    })
}
// delete products in database
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('deleteProduct service',id);
            const checkIdProducts = await Product.findOne({
                _id: id
            })
            if (!checkIdProducts) {
                resolve({
                    status: 'ERR',
                    message: 'The products not found in database, can you try?'
                })
            }
            const respone = await Product.findOneAndDelete({ _id: id });
            resolve({
                status: 'OK',
                message: `Delete Products ${checkIdProducts.name} Success`
            })
            // console.log('checkIdProducts',checkIdProducts);
        } catch (e) {
            reject(e)
        }
    })
}

//getAllProduct
const getAllProduct = (limit, page, sort, filter) => {
    console.log('limit page', limit, 'page', page);
    // console.log('filter',filter);
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            let allProduct = []
            if (filter) {
                // console.log('yeah!');
                // const objectFilter ={}
                //  objectFilter[filter[0]] = filter[1]       
                //  
                //  const label= filter[0]

                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                console.log('page * limit', page * limit);
                const totalProductLoop = await Product.find({ [label]: { '$regex': filter[1], $options: 'i' } }).count()
                // const allObjectFilter = await Product.find({[label]: { '$regex': filter[1], $options: 'i' }}).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    loopData: totalProductLoop,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    pageTotal: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                console.log('Sort', sort);
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                // console.log('objectSort',objectSort,'objectSort[sort[1]]',objectSort[sort[1]],'sort[0]',sort[0]);
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Success check sort',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    pageTotal: Math.ceil(totalProduct / limit)
                })
            }
            if (!limit) {
                allProduct = await Product.find()
            }
            //  allProduct = await Product.find().limit(limit).skip(page * limit).sort({
            //     name: sort
            // })
            else {
                // allProduct = await Product.find().limit(limit).skip(page * limit).sort({
                //     name: sort
                // })
                allProduct = await Product.find().limit(limit).skip(page * limit)
            }


            //  console.log('allProduct',allProduct.name);
            resolve({
                status: 'OK',
                message: 'Success Not Check',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                pageTotal: Math.ceil(totalProduct / limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')

            // console.log('allType',allType);
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType
            })
        } catch (err) {
            reject(err)
        }
    })
}
const deleteManyProduct = (ids) => {
    console.log('deleteManyProduct Serivce', ids);
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete Many Successful'
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    getAllType,
    deleteManyProduct
}