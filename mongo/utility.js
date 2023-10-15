const repository = require("./repository");

async function categoryExists(value)
{
    const { Categories } = repository;
    const exists = await Categories.countDocuments({ name: value }, { limit: 1 });
    return exists ? true : false;
}

module.exports = {
    categoryExists
}