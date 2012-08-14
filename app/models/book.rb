class Book < ActiveRecord::Base
  validates_presence_of :title
  validates_uniqueness_of :title
  validates_presence_of :author
  validates_presence_of :description
  validates :price,  :format => { :with => /^\d+?(?:\.\d{0,2})?$/, :message => "must have at most two decimal places" },
						:numericality => {:greater_than_or_equal_to => 0,  :message => "must be at least 0"}
end
