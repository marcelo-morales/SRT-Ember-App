const Results = require("../models/results");
const ApiError = require("../models/ApiError");
const mongoose = require("mongoose");


class ResultsDao {

    async create(command, data, plot) {
        const query = await Results.create({
            command: command,
            data: data,
            plot: plot
        });
        return {
            _id: query._id.toString(),
        };
    }

    async read(command) {
        const query = await Results.find({command: command}).lean().select("-__v");
        if (query === null) {
            throw new ApiError(404, "There is no result of the given command");
        }
        return query;
    }

    async readAll() {
        const query = await Results.find({}).lean().select("-__v");
        return query;
    }

    async delete(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(400, "Id given is not valid");
        }
        const query = await this.read(id);
        return Results.findByIdAndDelete(id).lean().select("-__v");
    }

    async update(id, { command, data, plot }) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(400, "Id given is not valid");
        }
        const query = await this.read(id);

        return Results.findByIdAndUpdate(
            id,
            { command, data, plot },
            {new: true, runValidators: true})
            .lean()
            .select("-__v");
    }
}

module.exports = ResultsDao;