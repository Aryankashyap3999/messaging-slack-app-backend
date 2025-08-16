export default function crudRepository(schema) {
    return {
        model: schema,
        create: async function (data)  {
            const newDoc = await this.model.create(data);
            return newDoc;
        },
        findById: async function (id)  {
            await this.model.find(id);
        },
        getAll: async function ()  {
            const allDocs = await this.model.find();
            return allDocs;
        },
        getById: async function (id)  {
            const doc = await this.model.findById(id);
            return doc;
        },
        delete: async function (id)  {
            const newDoc = await this.model.findByIdAndDelete(id);
            return newDoc;
        },
        update: async function (id, data)  {
            const response = await this.model.findByIdAndUpdate(id, data, {
                new: true
            });
            return response;
        }
    };
}