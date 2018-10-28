// @flow

import React, { Component, Fragment } from 'react';

import styled from 'styled-components';

import EditQuantityDialog from './components/EditQuantityDialog';
import ProductListItem from './components/ProductListItem';

const Container = styled.div`
  width: 100%;
  max-height: 350px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  onEditProductQuantity: Function,
  onRemoveProduct: Function,
  products: Array<Object>,
};

type State = {
  isEditQuantityDialogOpen: boolean,
  productSelectedIndex: number,
};

class ProductsSelectedList extends Component<Props, State> {
  state = {
    isEditQuantityDialogOpen: false,
    productSelectedIndex: '',
  };

  onEditButtonClicked = (productSelectedIndex: number): void => {
    this.setState({
      isEditQuantityDialogOpen: true,
      productSelectedIndex,
    });
  };

  onEditQuantity = (quantity: string): void => {
    const { onEditProductQuantity } = this.props;
    const { productSelectedIndex } = this.state;

    this.setState({
      isEditQuantityDialogOpen: false,
    }, () => onEditProductQuantity(productSelectedIndex, quantity));
  };

  onToggleEditQuantityDialog = (): void => {
    const { isEditQuantityDialogOpen } = this.state;

    this.setState({
      isEditQuantityDialogOpen: !isEditQuantityDialogOpen,
    });
  };

  renderList = (): Object => {
    const { onRemoveProduct, products } = this.props;

    return (
      <Fragment>
        {products.map((product, index) => {
          const total = product.quantity * product.salePrice;

          return (
            <ProductListItem
              onEdit={this.onEditButtonClicked}
              onRemove={onRemoveProduct}
              total={total.toFixed(2)}
              key={product.id}
              index={index}
              {...product}
            />
          );
        })}
      </Fragment>
    );
  };

  renderEditQuantityDialog = (): Object => {
    const { productSelectedIndex, isEditQuantityDialogOpen } = this.state;
    const { products } = this.props;

    const isInitialProductSelectedIndexValue = (typeof productSelectedIndex === 'string');
    const isProductListEmpty = !(products.length);

    if (isInitialProductSelectedIndexValue || isProductListEmpty) {
      return null;
    }

    const productSelected = products[productSelectedIndex];
    const { quantity } = productSelected;

    return (
      <EditQuantityDialog
        onCloseDialog={this.onToggleEditQuantityDialog}
        onEditQuantity={this.onEditQuantity}
        isOpen={isEditQuantityDialogOpen}
        quantity={quantity}
      />
    );
  };

  render() {
    return (
      <Container>
        {this.renderList()}
        {this.renderEditQuantityDialog()}
      </Container>
    );
  }
}

export default ProductsSelectedList;