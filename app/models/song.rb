class Song < ActiveRecord::Base
   validates_uniqueness_of :name
   validates_presence_of :album
   validates_presence_of :artist
end
