module.exports = {
  Query: {
    contacts: async (obj, args, context) => {
      const { contactService } = context;
      return await contactService.getAllContacts();
    },
  },
  Mutation: {
    createContact: async (_, { data }, context) => {
      const { contactService } = context;
      return await contactService.createContact(data);
    },
    updateContact: async (_, { id, data }, context) => {
      const { contactService } = context;
      return await contactService.updateContact(id, data);
    },
    deleteContact: async (_, { id }, context) => {
      const { contactService } = context;
      return await contactService.deleteContact(id);
    },
  },
};
