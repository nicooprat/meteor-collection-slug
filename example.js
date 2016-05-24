// -----------------------
// Simplest, no schema & default options
// Each time a Story is inserted or updated with the field `title` set,
// a `slug` field is automatically added
// -----------------------

Stories = new Mongo.Collection('stories');
Stories.attachBehaviour('slug');

// -----------------------
// With schema & default options
// Needs one of these packages: aldeed:collection2 or aldeed:simple-schema
// -----------------------

Stories = new Mongo.Collection('stories');

Stories.Schema = new SimpleSchema({
  title: {
    type: String
  }
});

Stories.attachSchema(Stories.Schema);
Stories.attachBehaviour('slug');

// -----------------------
// With schema & custom options
// -----------------------

Stories = new Mongo.Collection('stories');

Stories.Schema = new SimpleSchema({
  name: {
    type: String
  }
});

Stories.attachSchema(Stories.Schema);
Stories.attachBehaviour('slug', {
  source: 'name',
  destination: 'url'
});

// -----------------------
// Two collection with schemas & global behaviour options
// -----------------------

Stories.Schema = new SimpleSchema({
  name: {
    type: String
  }
});

Comments.Schema = new SimpleSchema({
  name: {
    type: String
  }
});

CollectionBehaviours.configure('slug', {
  source: 'name',
  destination: 'url'
});

CollectionBehaviours.attach([Stories, Comments], 'slug');
