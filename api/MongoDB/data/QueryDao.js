const Query = require("../models/query");
const ApiError = require("../models/ApiError");
const mongoose = require("mongoose");


class QueryDao {

    async create(command, email) {
        const query = await Query.create({
            command: command,
            email: email
        })
        return {
            _id: query._id.toString(),
        }
    }

    async read(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(400, "Id given is not valid");
        }
        const query = await Query.findById(id).lean().select("-__v");
        if (query === null) {
            throw new ApiError(404, "There is no query with the given ID");
        }
        return query;
    }

    async readAll() {
        const query = await Query.find({}).lean().select("-__v");
        return query;
    }

    async delete(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(400, "Id given is not valid");
        }
        const query = await this.read(id);
        return Query.findByIdAndDelete(id).lean().select("-__v");
    }

    async update(id, { command, data, image }) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(400, "Id given is not valid");
        }
        const query = await this.read(id);

        return Query.findByIdAndUpdate(
            id,
            { command, email},
            {new: true, runValidators: true})
            .lean()
            .select("-__v");
    }
}

module.exports = QueryDao;