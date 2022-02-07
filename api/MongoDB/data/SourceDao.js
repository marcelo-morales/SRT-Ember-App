const Source = require("../models/source");
const ApiError = require("../models/ApiError");
const mongoose = require("mongoose");


class SourceDao {

    async create(source) {
        const query = await Source.create({
            source: source,
        });
        return {
            _id: query._id.toString(),
        };
    }

    async read(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(400, "Id given is not valid");
        }
        const query = await Source.findById(id).lean().select("-__v");
        if (query === null) {
            throw new ApiError(404, "There is no source with the given ID");
        }
        return query;
    }

    async readAll() {
        const query = await Source.find({}).lean().select("-__v");
        return query;
    }

    async delete(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(400, "Id given is not valid");
        }
        const query = await this.read(id);
        return Source.findByIdAndDelete(id).lean().select("-__v");
    }

    async update(id, { source }) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(400, "Id given is not valid");
        }
        const query = await this.read(id);

        return Source.findByIdAndUpdate(
            id,
            { source },
            {new: true, runValidators: true})
            .lean()
            .select("-__v");
    }
}

module.exports = SourceDao;