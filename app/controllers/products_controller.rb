class ProductsController < ApplicationController
  def index
    @products=Camera.find(:all)
    @products+=Book.find(:all)
    @products+=Song.find(:all)
    @products=@products.sort{|t1,t2|t2.created_at <=> t1.created_at}
  end
  def paginate_items
    @products=Camera.find(:all)
    @products+=Book.find(:all)
    @products+=Song.find(:all)
    @products=@products.sort{|t1,t2|t2.created_at <=> t1.created_at}
    unless params[:page_number].to_i<=0
       @products=@products[(params[:page_number].to_i-1)*Rails.application.config.per_page_list,Rails.application.config.per_page_list]
    else
      @products=[]
    end
    @result=[]
    product_types=[]
    product_types=@products.map{|i| i.class.to_s} unless @products.length<=0
    @result[0]=@products
    @result[1]=product_types
    render :json=>@result
  end

end
