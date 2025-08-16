export default function crudRepository(schema) {
    return {
        model: schema,
        create: async (data) => {
            const newDoc = await this.model.create(data);
            return newDoc;
        },
        findById: async (id) => {
            await this.model.find(id);
        },
        getAll: async () => {
            const allDocs = await this.model.find();
            return allDocs;
        },
        getById: async (id) => {
            const doc = await this.model.findById(id);
            return doc;
        },
        delete: async (id) => {
            const newDoc = await this.model.findByIdAndDelete(id);
            return newDoc;
        },
        update: async (id, data) => {
            const response = await this.model.findByIdAndUpdate(id, data, {
                new: true
            });
            return response;
        }
    };
}