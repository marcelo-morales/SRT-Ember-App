const Result = require("../models/result");
const ApiError = require("../models/ApiError");
const mongoose = require("mongoose");


class ResultDao {

    async create(command) {
        const result = await Result.create({
            command: command,
        })
        return {
            _id: result._id.toString(),
            data: result.data,
            image: result.image
        }
    }

    async read(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(400, "Id given is not valid");
        }
        const result = await Result.findById(id).lean().select("-__v");
        if (result === null) {
            throw new ApiError(404, "There is no command with the given ID");
        }
        return result;
    }

    async readAll() {
        const result = await Result.find({}).lean().select("-__v");
        return result;
    }

    async delete(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(400, "Id given is not valid");
        }
        const result = await this.read(id);
        return Result.findByIdAndDelete(id).lean().select("-__v");
    }

    async update(id, { command, data, image }) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(400, "Id given is not valid");
        }
        console.log(id);
        const result = await this.read(id);

        return Result.findByIdAndUpdate(
            id,
            { command, data, image },
            {new: true, runValidators: true})
            .lean()
            .select("-__v");
    }
}

module.exports = ResultDao;