class Camera < ActiveRecord::Base
   validates_presence_of :model
    validates_uniqueness_of :model
   validates_presence_of :make
   validates_presence_of :price
  validates :price,  :format => { :with => /^\d+?(?:\.\d{0,2})?$/, :message => "must have at most two decimal places" },
						:numericality => {:greater_than_or_equal_to => 0,  :message => "must be at least 0"}

end
