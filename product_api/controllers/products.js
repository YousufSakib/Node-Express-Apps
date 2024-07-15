const Product = require("../models/product");

const getAllProductsStatic = async (req, res, next) => {
    try {
        const products = await Product.find({ price: { $gt: 30 } })
            .sort("price")
            .select("name price");

        // throw new Error({ msg: "custom api error", code: 500 });
        res.status(200).json({
            products,
            nbHits: products.length,
        });
    } catch (err) {
        next(err);
    }
};

const getAllProducts = async (req, res) => {
    try {
        const { featured, company, name, numericFilters, sort, fields } =
            req.query;
        const queryObject = {};
        if (featured) {
            queryObject.featured = featured === "false" ? false : true;
        }
        if (company) {
            queryObject.company = company;
        }
        if (name) {
            queryObject.name = { $regex: name, $options: "i" };
        }
        if (numericFilters) {
            const operatorMap = {
                ">": "$gt",
                ">=": "$gte",
                "=": "$eq",
                "<": "$lt",
                "<=": "$lte",
            };
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            let filters = numericFilters.replace(
                regEx,
                (match) => `-${operatorMap[match]}-`,
            );
            const options = ["price", "rating"];
            filters = filters.split(",").forEach((item) => {
                const [field, operator, value] = item.split("-");
                if (options.includes(field)) {
                    queryObject[field] = { [operator]: Number(value) };
                }
            });
        }
        let result = Product.find(queryObject);
        if (sort) {
            const sortList = sort.split(",").join(" ");
            result = result.sort(sortList);
        } else {
            result = result.sort("createdAt");
        }
        if (fields) {
            const fieldList = fields.split(",").join(" ");
            result = result.select(fieldList);
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        result = result.skip(skip).limit(limit);

        const products = await result;

        res.status(200).json({
            products,
            nbHits: products.length,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
