import { Component, OnInit } from '@angular/core';
import { PersistentStorageService } from 'src/app/core/services/persistent-storage.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  constructor(private pss: PersistentStorageService) { }

  ngOnInit(): void {
  }

  // #region modal
  showModal: boolean = false;
  toggleModal = () => {
    this.showModal = !this.showModal;
  }
  // #endregion

// #region clear data confirmation
  onClearData() {
    if (confirm('Are you sure to clear data?\n(all of fav posts and fav subreddits will be lost, as reset to the default)')) {
      this.pss.removeItemAsync('fav-subreddits');
      this.pss.removeItemAsync('fav-posts').then(() => window.location.reload());
    }
  }
// #endregion

}
