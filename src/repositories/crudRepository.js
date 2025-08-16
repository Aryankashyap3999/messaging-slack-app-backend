export default function crudRepository(model) {
    return {

        create: async function (data)  {
            const newDoc = await model.create(data);
            return newDoc;
        },
        findById: async function (id)  {
            await model.find(id);
        },
        getAll: async function ()  {
            const allDocs = await model.find();
            return allDocs;
        },
        getById: async function (id)  {
            const doc = await model.findById(id);
            return doc;
        },
        delete: async function (id)  {
            const newDoc = await model.findByIdAndDelete(id);
            return newDoc;
        },
        update: async function (id, data)  {
            const response = await model.findByIdAndUpdate(id, data, {
                new: true
            });
            return response;
        }
    };
}